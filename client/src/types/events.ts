import { FormEvent, ChangeEvent, MouseEvent } from "react";

// Events
export type FormSubmitEvent = FormEvent<HTMLFormElement>;
export type FieldEvent = ChangeEvent<HTMLInputElement>;
export type ButtonEvent = MouseEvent<HTMLButtonElement>;
export type MenuItemEvent = MouseEvent<HTMLLIElement> | MouseEvent<HTMLButtonElement>;
