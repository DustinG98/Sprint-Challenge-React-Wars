import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

const Pageinate = (props) => {

  return (
    <Pagination size="sm" aria-label="Page navigation example">
      <PaginationItem>
        <PaginationLink next href="#"/>
      </PaginationItem>
      <PaginationItem>
        <PaginationLink previous href="#"/>
      </PaginationItem>
    </Pagination>
  );
}

export default Pageinate;