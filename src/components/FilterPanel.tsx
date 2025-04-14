import React, { useRef, useState } from "react";
import { FilterInput } from "../types/filterInputType";
import "../styles/filter.css";
import { filters } from "../constants/filters_clean";
import DropdownSelector from "./DropdownSelector";

const FilterPanel = ({
  setFilters,
}: {
  setFilters: (filters: FilterInput) => void;
}) => {
  const [formData, setFormData] = useState<FilterInput>({});
  const [errorBasics, setErrorBasics] = useState(false);
  const lastSubmittedDataRef = useRef<FilterInput>({});

  const handleChange = (field: keyof FilterInput, value: string | number) => {
    if (value === "" || value === 0) {
      setFormData((prev) => {
        const newForm = { ...prev };
        delete newForm[field];
        return newForm;
      });
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const keysArray = Object.keys(formData);
    const filtersArray = ["year"];
    const includeBasicFilters = filtersArray.every((item) =>
      keysArray.includes(item)
    );

    if (!includeBasicFilters) {
      setErrorBasics(true);
      return;
    } else {
      setErrorBasics(false);
    }

    const currentDataStr = JSON.stringify(formData);
    const lastDataStr = JSON.stringify(lastSubmittedDataRef.current);
    if (currentDataStr === lastDataStr) return;
    lastSubmittedDataRef.current = formData;
    if (keysArray.length === 0) return;
    setFilters(formData);
  };

  return (
    <div className="npm-filter-panel">
      <div className="npm-filter-panel-inner">
        <form onSubmit={handleSubmit} className="npm-filter-form">
          <div className="npm-filter-row">
            <DropdownSelector
              optionName="Year"
              optionsList={filters.year}
              onSelect={(value) => handleChange("year", Number(value))}
              selectedOption={formData.year || 0}
              isOnError={errorBasics && !formData.year}
              isSmall
            />
            <DropdownSelector
              optionName="Make"
              optionsList={filters.make}
              onSelect={(value) => handleChange("make", value)}
              selectedOption={formData.make || ""}
              isOnError={errorBasics && !formData.make}
            />
            <DropdownSelector
              optionName="Model"
              optionsList={filters.model}
              onSelect={(value) => handleChange("model", value)}
              selectedOption={formData.model || ""}
              isOnError={errorBasics && !formData.model}
            />

            <div className="npm-filter-action">
              <button className="npm-filter-go-button" onClick={handleSubmit}>
                Go
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FilterPanel;
