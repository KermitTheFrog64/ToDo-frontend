interface SearchBarPayload {
    search: string
    setSearch: (e: any) => void
}

const SearchBar: React.FC<SearchBarPayload> = ({search, setSearch}) => {

    const handleSearchChange = (event: any) => {
        setSearch(event.target.value)
    }

    return (
        <input 
        type="text" 
        placeholder="Search by name..."
        value={search}
        onChange={handleSearchChange}
        />
    )
}

export default SearchBar