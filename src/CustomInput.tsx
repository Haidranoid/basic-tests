import React, {FC} from "react";

interface CustomInputProps {
    children: React.ReactNode;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomInput: FC<CustomInputProps> = ({children, value, onChange}) => {
    return <div>
        <label htmlFor="search">
            {children}
        </label>
        <input data-testid="search"
               placeholder="insert"
               id="search"
               type="text"
               value={value}
               onChange={onChange}/>
    </div>
}

export default CustomInput;