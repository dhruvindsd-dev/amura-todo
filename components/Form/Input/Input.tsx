import React, { ChangeEventHandler, ReactElement } from "react";
import styles from "./index.module.scss";

interface InputProps {
	onBlur?: ChangeEventHandler<HTMLInputElement> | undefined;
	onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
	name?: string;
	label: string;
	icon?: ReactElement;
	type?: "text" | "number" | "password" | "email";
	defaultValue?: string;
	value?: string;
	disableTopMargin?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	(
		{
			label,
			onChange,
			onBlur,
			name,
			icon,
			value = undefined,
			type = "text",
			defaultValue = "",
		},
		ref
	) => {
		return (
			<div>
				<div className={`${styles.wrapper} ${!!icon ? styles.has_icon : ""}`}>
					<input
						ref={ref}
						onChange={onChange}
						onBlur={onBlur}
						name={name}
						type={type}
						placeholder=" "
						defaultValue={defaultValue}
						value={value}
					/>
					<label>{label}</label>
					{!!icon && <span className={styles.icon}>{icon}</span>}
				</div>
			</div>
		);
	}
);
Input.displayName = Input.name;
export default Input;
