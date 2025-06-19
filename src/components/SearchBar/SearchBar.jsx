import css from "./SearchBar.module.css";
import { Formik, Field, Form } from "formik";
import { FiSearch } from "react-icons/fi";

export default function SearchBar({ onSearch }) {
  return (
    <header className={css.header}>
      <Formik
        initialValues={{ topic: "" }}
        onSubmit={(values, actions) => {
          onSearch(values.topic);
          actions.resetForm();
        }}
      >
        <Form className={css.form}>
          <div className={css.searchWrapper}>
            <button type="submit" className={css.searchButton}>
              <FiSearch size={20} />
            </button>
            <Field
              name="topic"
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
              className={css.input}
            />
          </div>
        </Form>
      </Formik>
    </header>
  );
}
