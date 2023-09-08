import { DragEvent, useRef, useState } from "react";

import { fromEvent } from "file-selector";

const handleEvent = (event: DragEvent<HTMLDivElement>) => {
  event.preventDefault();
  event.stopPropagation();
};

const isFile = (event: DragEvent<HTMLDivElement>) => {
  const items = event.dataTransfer.items;
  const isFile = Array.from(items).some((item) => item.kind === "file");

  // onDragEnter 이벤트는 파일이 아닌 경우
  if (!isFile) return false;

  return true;
};

interface UseDirDropAreaProps {
  enableIsDragActive?: boolean;
  dragEnter?: (event: DragEvent<HTMLDivElement>) => void;
  dragLeave?: (event: DragEvent<HTMLDivElement>) => void;
  dropEvent?: (dropFiles: File[], event: DragEvent<HTMLDivElement>) => void;
}

const useDirDropArea = ({
  dragEnter,
  dragLeave,
  dropEvent,
}: UseDirDropAreaProps) => {
  const dragCounter = useRef<number>(0);

  const [dropFiles, setDropFiles] = useState<File[]>([]);
  const [isDragActive, setIsDragActive] = useState<boolean>(false);

  const onDragEnter = (event: DragEvent<HTMLDivElement>) => {
    if (!isFile(event)) return;

    handleEvent(event);

    dragCounter.current++;

    if (dragCounter.current === 1) {
      setIsDragActive(true);
      dragEnter && dragEnter(event);
    }
  };

  const onDragLeave = (event: DragEvent<HTMLDivElement>) => {
    if (!isFile(event)) return;

    handleEvent(event);

    dragCounter.current--;

    if (dragCounter.current === 0) {
      setIsDragActive(false);
      dragLeave && dragLeave(event);
    }
  };

  const onDrop = async (event: DragEvent<HTMLDivElement>) => {
    if (!isFile(event)) return;

    handleEvent(event);

    const files = (await fromEvent(event)) as File[];

    setIsDragActive(false);
    setDropFiles(files);
    dragCounter.current--;

    dropEvent && dropEvent(files, event);
  };

  const rootDropArea = {
    onDrop,
    onDragEnter,
    onDragLeave,
  };

  return { dropFiles, isDragActive, rootDropArea };
};

export default useDirDropArea;
