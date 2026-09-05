'use client';

import { useState, SyntheticEvent } from 'react';
import css from './SearchFilter.module.css';
import { FilterData, FormDataValue } from '@/types/camper';

interface SearchFilterProps {
  filtersData?: FilterData;
  onSearch: (filters: FormDataValue) => void;
}

const DEFAULT_FILTER_DATA: FilterData = {
  forms: ['alcove', 'panel_van', 'integrated', 'semi_integrated'],
  engines: ['petrol', 'diesel', 'hybrid', 'electric'],
  transmissions: ['automatic', 'manual'],
};

const INITIAL_FORM_STATE: FormDataValue = {
  location: '',
  form: '',
  engine: '',
  transmission: '',
};

export default function SearchFilter({
  filtersData = DEFAULT_FILTER_DATA,
  onSearch,
}: SearchFilterProps) {
  const [location, setLocation] = useState<string>('');
  const [draftFilters, setDraftFilters] = useState<FormDataValue>(INITIAL_FORM_STATE);

  const handleFilterSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch({
      ...draftFilters,
      location: location.trim(),
    });
  };

  const handleClear = () => {
    setLocation('');
    setDraftFilters(INITIAL_FORM_STATE);
    onSearch(INITIAL_FORM_STATE);
  };

  const formatOptionLabel = (labelValue: string) =>
    labelValue
      .split('_')
      .map(word => word[0].toUpperCase() + word.slice(1))
      .join(' ');

  return (
    <aside className={css.asideFilters}>
      <form className={css.formFilter} onSubmit={handleFilterSubmit}>
        <div className={css.formContainer}>
          {}
          <label className={css.labelLocation}>
            <span>Location</span>
            <div className={`${css.containerInput} ${location ? css.filled : ''}`}>
              <svg className={css.mapIcon}  aria-hidden="true">
                <use href="/IconsSprite.svg#Map" />
              </svg>
              <input
                value={location}
                onChange={e => setLocation(e.target.value)}
                type="text"
                placeholder="Kyiv"
                name="location"
                className={css.inputLocation}
              />
            </div>
          </label>

          <div className={css.filterContainer}>
            <p className={css.titleFilter}>Filters</p>

            {}
            <div className={css.CamperField}>
              <p className={css.radioTitle}>Camper form</p>
              {filtersData.forms?.map(formOption => (
                <label key={formOption} htmlFor={`form-${formOption}`} className={css.labelRadio}>
                  <input
                    type="radio"
                    name="camperFormGroup"
                    id={`form-${formOption}`}
                    value={formOption}
                    checked={draftFilters.form === formOption}
                    onChange={() =>
                      setDraftFilters(prev => ({
                        ...prev,
                        form: prev.form === formOption ? '' : formOption,
                      }))
                    }
                  />
                  <span>{formatOptionLabel(formOption)}</span>
                </label>
              ))}
            </div>

            {}
            <div className={css.CamperField}>
              <p className={css.radioTitle}>Engine</p>
              {filtersData.engines?.map(engineOption => (
                <label key={engineOption} htmlFor={`engine-${engineOption}`} className={css.labelRadio}>
                  <input
                    type="radio"
                    name="engineTypeGroup"
                    id={`engine-${engineOption}`}
                    value={engineOption}
                    checked={draftFilters.engine === engineOption}
                    onChange={() =>
                      setDraftFilters(prev => ({
                        ...prev,
                        engine: prev.engine === engineOption ? '' : engineOption,
                      }))
                    }
                  />
                  <span>{formatOptionLabel(engineOption)}</span>
                </label>
              ))}
            </div>

            {}
            <div className={css.CamperField}>
              <p className={css.radioTitle}>Transmission</p>
              {filtersData.transmissions?.map(transmissionOption => (
                <label key={transmissionOption} htmlFor={`trans-${transmissionOption}`} className={css.labelRadio}>
                  <input
                    type="radio"
                    name="transmissionTypeGroup"
                    id={`trans-${transmissionOption}`}
                    value={transmissionOption}
                    checked={draftFilters.transmission === transmissionOption}
                    onChange={() =>
                      setDraftFilters(prev => ({
                        ...prev,
                        transmission: prev.transmission === transmissionOption ? '' : transmissionOption,
                      }))
                    }
                  />
                  <span>{formatOptionLabel(transmissionOption)}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {}
        <div className={css.formButton}>
          <button type="submit" className={css.searchBtn}>
            Search
          </button>
          <button type="button" className={css.clearBtn} onClick={handleClear}>
            <svg className={css.vectorIcon}>
              <use href="/logo-sprite.svg#Vector"  aria-hidden="true"/>
            </svg>
            Clear filters
          </button>
        </div>
      </form>
    </aside>
  );
}