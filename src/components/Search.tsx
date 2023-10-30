import { Component, ReactNode } from 'react';
import { ResponceType } from './apiResponseType';
import { State } from './ShowResults';

interface PropType {
  handleSetState: (state: State) => void;
  handleBeginLoad: () => void;
}

class Search extends Component<PropType, Record<string, never>> {
  searchInputClass = 'section-search__input';

  searchOptionClass = 'section-search__select';

  searchBtnClass = 'section-search__btn-search';

  storageKey = 'searchStartValue';

  baseUrl = 'https://swapi.dev/api/';

  private onSearch = () => {
    const { handleSetState, handleBeginLoad } = this.props;
    handleBeginLoad();
    const input: HTMLInputElement = document.querySelector(`.${this.searchInputClass}`)!;
    const inputValue = input.value;
    const select: HTMLSelectElement = document.querySelector(`.${this.searchOptionClass}`)!;
    const selectValue = select.value;

    localStorage.setItem(this.storageKey, inputValue);

    const seachArg = inputValue ? `?search=${inputValue}` : '';

    fetch(`${this.baseUrl}${selectValue}/${seachArg}`)
      .then(async (val: Response) => val.json())
      .then((data: ResponceType) => handleSetState(data.results))
      .catch(console.log);
  };

  render(): ReactNode {
    const inputStartValue = localStorage.getItem(this.storageKey) ?? '';

    return (
      <section className="section-search">
        <select className={this.searchOptionClass} defaultValue="people">
          <option value="people">people</option>
          <option value="planets">planets</option>
          <option value="films">films</option>
          <option value="species">species</option>
          <option value="vehicles">vehicles</option>
          <option value="starships">starships</option>
        </select>
        <input
          className={this.searchInputClass}
          type="text"
          defaultValue={inputStartValue}
          placeholder="Type seach query to API"
        />
        <button className={this.searchBtnClass} type="button" onClick={() => this.onSearch()}>
          Search
        </button>
      </section>
    );
  }
}

export default Search;
