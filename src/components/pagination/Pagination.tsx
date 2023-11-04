import { Form } from 'react-router-dom';
import { PagedResponseType } from '../../api/apiResponseType';
import styles from './Pagination.module.css';

interface PropType {
  pagination: PagedResponseType;
}

export const paginationFormName = 'paginationForm';

function Pagination({ pagination: { page, pageCount, itemsPerPage } }: PropType) {
  function handleChangeItemsPerPage(e: Event) {
    console.log(e);
  }
  const prevDisabled = page === 1;
  const nextDisabled = page === pageCount;

  return (
    <div className={styles['pagination-wrapper']}>
      <Form method="post" action="/search/1" onSubmit={(e: Event) => handleChangeItemsPerPage(e)}>
        <select
          name="itemsPerPage"
          defaultValue={itemsPerPage}
          onChange={(e: Event) => handleChangeItemsPerPage(e)}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
        </select>
      </Form>
      <Form method="post" action="/search/1">
        <input type="hidden" name="formName" value={paginationFormName} />
        <button type="submit" disabled={prevDisabled}>
          {'<<'}
        </button>
      </Form>
      <Form method="post" action={`/search/${page - 1}`}>
        <input type="hidden" name="formName" value={paginationFormName} />
        <button type="submit" disabled={prevDisabled}>
          {'<'}
        </button>
      </Form>
      <button type="button" disabled>
        {page}
      </button>
      <Form method="post" action={`/search/${page + 1}`}>
        <input type="hidden" name="formName" value={paginationFormName} />
        <button type="submit" disabled={nextDisabled}>
          {'>'}
        </button>
      </Form>
      <Form method="post" action={`/search/${pageCount}`}>
        <input type="hidden" name="formName" value={paginationFormName} />
        <button type="submit" disabled={nextDisabled}>
          {'>>'}
        </button>
      </Form>
    </div>
  );
}

export default Pagination;
