export const ProductFilter = ({ selectedCategory, setSelectedCategory }) => {
    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    return (
        <select
            name="category"
            id="category"
            className="w-full py-3 text-sm text-Variant2 placeholder-Variant2 outline-none"
            value={selectedCategory}
            onChange={handleCategoryChange}
        >
            <option value="All">All</option>
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
            <option value="Shoes">Shoes</option>
            <option value="Personal Care and Beauty">Personal Care and Beauty</option>
            <option value="Food and Beverage">Food and Beverage</option>
        </select>
    );
};