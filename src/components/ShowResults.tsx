import { Component, ReactNode } from 'react';

export interface StateElement {
  name?: string;
  title?: string;
  model?: string;
}

export type State = StateElement[];

const showedCount = 4;

interface PropType {
  currentState: State;
}

interface StateType {
  stateValue?: State;
}

class ShowResults extends Component<PropType, StateType> {
  resultSectionClass = 'apiCallResults';

  render(): ReactNode {
    const { currentState } = this.props;
    if (currentState) {
      const results = Object.entries(currentState);
      const resultsCount = results.length;
      if (resultsCount > 0) {
        return (
          <section className={this.resultSectionClass}>
            {results.map(function a(mapVal: [string, StateElement]) {
              const [, val] = mapVal;
              return (
                <div className="card" key={`${Math.random()}`}>
                  {Object.entries(val).map(function b(entry: [string, string], index: number) {
                    if (index <= showedCount) {
                      const [entryKey, value] = entry;
                      return (
                        <div className="obj-cart__property" key={`${Math.random()}`}>
                          {entryKey}: {value}
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              );
            })}
          </section>
        );
      }
      return <p>Nothing to show</p>;
    }
    return null;
  }
}

export default ShowResults;
