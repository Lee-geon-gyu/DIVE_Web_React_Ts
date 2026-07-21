import './explorer-controls.css'

export interface ExplorerFilterOption {
  value: string
  label: string
}

export interface ExplorerSortOption {
  value: string
  label: string
}

interface ExplorerControlsProps {
  searchInputId: string
  resultsId: string
  searchLabel: string
  searchPlaceholder: string
  searchQuery: string
  onSearchQueryChange: (value: string) => void
  filterLabel: string
  filterOptions: ExplorerFilterOption[]
  selectedFilter: string
  onSelectedFilterChange: (value: string) => void
  sortLabel?: string
  sortOptions?: ExplorerSortOption[]
  selectedSort?: string
  onSelectedSortChange?: (value: string) => void
}

export function ExplorerControls({
  searchInputId,
  resultsId,
  searchLabel,
  searchPlaceholder,
  searchQuery,
  onSearchQueryChange,
  filterLabel,
  filterOptions,
  selectedFilter,
  onSelectedFilterChange,
  sortLabel,
  sortOptions,
  selectedSort,
  onSelectedSortChange,
}: ExplorerControlsProps) {
  return (
    <div className="explorer-controls">
      <div className="explorer-controls__search">
        <label className="explorer-controls__label" htmlFor={searchInputId}>
          {searchLabel}
        </label>
        <input
          id={searchInputId}
          className="explorer-controls__input"
          type="search"
          value={searchQuery}
          placeholder={searchPlaceholder}
          autoComplete="off"
          aria-controls={resultsId}
          onChange={(event) => onSearchQueryChange(event.target.value)}
        />
      </div>

      <fieldset className="explorer-controls__filters">
        <legend className="explorer-controls__legend">{filterLabel}</legend>
        <ul className="explorer-controls__filter-list">
          {filterOptions.map((option) => {
            const isSelected = selectedFilter === option.value

            return (
              <li key={option.value}>
                <button
                  className="explorer-controls__filter-button"
                  type="button"
                  aria-pressed={isSelected}
                  aria-controls={resultsId}
                  onClick={() => onSelectedFilterChange(option.value)}
                >
                  {option.label}
                </button>
              </li>
            )
          })}
        </ul>
      </fieldset>

      {sortOptions && selectedSort !== undefined && onSelectedSortChange && (
        <div className="explorer-controls__sort">
          <label
            className="explorer-controls__label"
            htmlFor={`${searchInputId}-sort`}
          >
            {sortLabel ?? '정렬'}
          </label>
          <select
            id={`${searchInputId}-sort`}
            className="explorer-controls__select"
            value={selectedSort}
            aria-controls={resultsId}
            onChange={(event) => onSelectedSortChange(event.target.value)}
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  )
}
