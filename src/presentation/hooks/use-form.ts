import { useEffect, useState } from "react";

type KeyValidationType = {
  function: (value: string) => boolean;
  message: string;
};

type FormValidationType<T> = Record<keyof T, KeyValidationType[]>;

type DefaultValues<T> = Record<keyof T, string>;

type Props<T> = {
  defaultValues: DefaultValues<T>;
  formValidations: FormValidationType<T>;
};

type FormState<T> = {
  formErrors: Record<keyof FormValidationType<T>, string[]>;
  isFormValid: boolean;
  isFormSubmitted: boolean;
};

export default function useForm<T>({ defaultValues, formValidations }: Props<T>) {
  const [formValues, setFormValues] = useState<DefaultValues<T>>(defaultValues);
  const [formState, setFormState] = useState({
    isFormSubmitted: false,
    isFormValid: false,
    formErrors: Object.keys(defaultValues).reduce(
      (acc, key) => {
        acc[key as keyof T] = [];
        return acc;
      },
      {} as Record<keyof T, string[]>,
    ),
  });
  const { formErrors, isFormSubmitted, isFormValid } = formState;

  useEffect(() => {
    if (isFormSubmitted) {
      validateForm(formValidations);
    }

    return () => {};
  }, [formValues]);

  const onInputChange = ({ key, value }: { key: keyof DefaultValues<T>; value: string }) => {
    setFormValues({
      ...formValues,
      [key]: value,
    });
  };

  const validateForm = (formValidations: FormValidationType<T>, cb?: (formValues: DefaultValues<T>) => void) => {
    const keys = Object.keys(formValidations);
    const validations = { ...formErrors };

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i] as keyof Record<keyof T, []>;
      const keyValidations = formValidations[key];

      for (let j = 0; j < keyValidations.length; j++) {
        const isValid = keyValidations[j]["function"](formValues[key]);

        if (isValid) {
          const newValidations = validations[key].filter((item) => item !== formValidations[key][j]["message"]);
          validations[key] = newValidations;
        }
        if (!isValid) {
          const newValidations = validations[key].includes(formValidations[key][j]["message"])
            ? validations[key]
            : [...validations[key], formValidations[key][j]["message"]];
          validations[key] = newValidations;
        }
      }
    }

    const isFormValid = Object.values<string[]>(validations).every((item) => item.length === 0);

    setFormState((prev) => ({
      ...prev,
      formErrors: { ...validations },
      isFormValid,
    }));

    if (isFormValid && cb) {
      cb(formValues);
    }
  };

  const handleSubmit = (cb: (formValues: DefaultValues<T>) => void) => {
    if (!isFormSubmitted) {
      setFormState({
        ...formState,
        isFormSubmitted: true,
      });
    }
    validateForm(formValidations, cb);
  };
  return {
    onInputChange,
    formValues,
    ...formState,
    formState,
    handleSubmit,
  };
}
