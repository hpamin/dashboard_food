import React, { useEffect } from 'react';
import { IoIosSearch } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, setSearchQuery } from '../../../redux/actions/actions';
import SearchQuery from './searchQuery/SearchQuery';

const SearchProduct = () => {

  // redux
  const dispatch = useDispatch();
  const { items, searchQuery } = useSelector(state => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const filteredProducts = items.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.id.toString().includes(searchQuery)
  );

  const handleSearch = event => {
    dispatch(setSearchQuery(event.target.value));
  };

  return (
    <div className='w-full relative'>
      <div
        className='w-[32rem] flex border-b-[1px] items-center justify-center pb-2 relative'
        style={{ borderColor: 'gray' }}
      >
        <IoIosSearch size={25} />
        <input
          type="text"
          className='w-[30rem] outline-none'
          placeholder='Search'
          style={{ backgroundColor: 'transparent' }}
          dir='rtl'
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>
      {searchQuery && filteredProducts.length > 0 && (
        <div className='w-[32rem] h-fit bg-border-color p-5 absolute left-0 rounded-b-md z-30 flex flex-col items-start gap-5 top-full right-0'>
          {filteredProducts.map(item => (
            <SearchQuery key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchProduct;
