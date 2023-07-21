import React, { useEffect } from 'react';
import { Select, FormControl, InputLabel, MenuItem, TablePagination } from '@mui/material';
import { useStore } from '../../stores/Store';
import { observer } from 'mobx-react';
import Consts from '../../common/Consts';

const Pagination = observer(() => {
  const { productStore } = useStore();

  useEffect(() => {
    productStore.getMany();
  })

  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(Consts.DEFAULT_PAGINATION_TAKE);

  const handleChangePage = (event, newPage) => {
    if (newPage < page) {
      productStore.getPagination().previousPage();
    } else {
      productStore.getPagination().nextPage();
    }
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <FormControl sx={{ width: '12rem' }}>
        <InputLabel id='1'>Sort by</InputLabel>
        <Select
          labelId='1'
          label='Sort by'
          value={age}
          onChange={handleChange}
        >
          <MenuItem value='price-low'>Price Low</MenuItem>
          <MenuItem value='price-high'>Price High</MenuItem>
          <MenuItem value='a-z'>A-Z</MenuItem>
          <MenuItem value='z-a'>Z-A</MenuItem>
        </Select>
      </FormControl>
      <TablePagination
        component="div"
        count={productStore.count}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  )
});

export default Pagination