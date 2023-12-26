import ErrorDisplayer from "./ErrorsDisplayer";

const Form = ({ children, onSubmit, formInstance }) => {
  return (
    <form onSubmit={onSubmit}>
      <ErrorDisplayer formInstance={formInstance} />
      {children}
    </form>
  );
};

export default Form;
