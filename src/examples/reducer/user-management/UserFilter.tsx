type UserFilterProps = {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  showActiveOnly: boolean;
  onActiveOnlyChange: (value: boolean) => void;
};

function UserFilter({searchTerm, onSearchChange, showActiveOnly, onActiveOnlyChange}: UserFilterProps) {
  return (
    <div>
      <input type="text" value={searchTerm} onChange={e => onSearchChange(e.target.value)}/>
      <label>
        <input type="checkbox" checked={showActiveOnly} onChange={e => onActiveOnlyChange(e.target.checked)}/> Active users only
      </label>
    </div>
  );
}

export default UserFilter