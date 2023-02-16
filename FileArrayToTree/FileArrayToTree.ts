interface MyFileType extends File {
  path: string; // drag and drop
  webkitRelativePath: string; // input file
}

const fileArrayToTree = (files: MyFileType[]) => {
  let tree: any[] = [];

  for (let i = 0; i < files.length; i++) {
    let paths;

    if (files[i].path) {
      paths = files[i].path.split("/");
    } else {
      paths = files[i].webkitRelativePath.split("/");
    }

    if (paths[0] === "") {
      paths.shift();
    }

    let currentLevel = tree;
    for (let j = 0; j < paths.length; j++) {
      let part = paths[j];

      let existingPath = findWhere(currentLevel, "name", part);

      if (existingPath) {
        currentLevel = existingPath.children;
      } else {
        let newPart = {
          name: part,
          children: [],
          file: paths.length - 1 === j ? files[i] : null,
          dirId: null,
          parentId: null,
        };

        currentLevel.push(newPart);

        currentLevel = newPart.children;
      }
    }
  }

  return tree;

  function findWhere(array: any[], key: string, value: any) {
    let t = 0;
    while (t < array.length && array[t][key] !== value) {
      t++;
    }

    if (t < array.length) {
      return array[t];
    } else {
      return false;
    }
  }
};

export default fileArrayToTree;
