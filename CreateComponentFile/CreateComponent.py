import os

input_name = input("Component Name: ");

class FileName:
    def __init__(self):
        self.styled = f"{input_name}.styled.ts"
        self.type = f"{input_name}.type.ts"
        self.component = f"{input_name}.tsx"
        self.index = "index.ts"

folder_path = f"path/{input_name}"

os.makedirs(folder_path)

print(f"{folder_path} 폴더가 생성되었습니다.")


def createFile(name, code) :
    with open(folder_path + name, "w") as file:
        file.write(code)

    print(f"{name} 파일이 생성되었습니다.")

file_name = FileName()

styled_code = """import styled from 'styled-components';

export const Container = styled.div``;
"""

type_code = f"""export interface {input_name}Props {{}}"""

component_code = f"""import * as S from './{input_name}.styled';
import * as T from './{input_name}.type';

const {input_name} = ({{}}: T.{input_name}Props) => {{
  return <S.Container>{input_name}</S.Container>;
}};

export default {input_name};
"""

index_code = f"""export {{ default }} from './{input_name}';"""

createFile(file_name.styled, styled_code)
createFile(file_name.type, type_code)
createFile(file_name.component, component_code)
createFile(file_name.index, index_code)



