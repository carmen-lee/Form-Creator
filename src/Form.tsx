import React, { ReactElement, useState, useEffect } from "react";
import formJSON from "./formJSON.json";
import Element from "./components/Elements"
import { makeStyles } from "@material-ui/core";

const Form: React.FC<Props> = ({
	props: {
		useStyles = makeStyles({})
	}
}: Props): ReactElement => {
	const [elements, setElements] = useState<FormProps>({});

	const classes = useStyles();

	useEffect(() => {
		setElements(formJSON[0]);
	}, []);

	const { formName, fields } = elements ?? {};

	const handleSubmit = (e: React.MouseEvent) => {
		e.preventDefault();
		console.log(elements);
	};

	const handleChange = (e: React.ChangeEvent, id: string, value: any) => {
		const newElements = { ...elements };
		newElements.fields?.forEach((field) => {
			const { fieldKey } = field;
			if (id === fieldKey) {
				field["fieldValue"] = value;
			}
			setElements(newElements);
		});
	};

	return (
		<div className={classes?.formContainer}>
			<header className="form--heading">{formName}</header>
			<div className="form--body">
				<form className="">
					{ fields ? fields.map ( (field,i) => <Element key={i} fields={field} handleChange={handleChange} useStyles={useStyles}/>) : null }
				</form>
			</div>
			<button className="form--submit-button" onClick={(e) => handleSubmit(e)}>Submit</button>
		</div>
	);
};

interface Props {
	props: {
		useStyles?: any;
	};
}

interface FormProps {
	formName?: string;
	fields?: FormFields[];
}

interface FormFields {
	fieldKey?: string;
	fieldPrompt?: string;
	fieldMandatory?: string;
	fieldPlaceholder?: string;
	fieldType?: string;
	fieldValue?: string;
	fieldOptions?: OptionList[];
}

interface OptionList {
	optionLabel: string;
}

export default Form;
