import Pagination from '../pagination/Pagination';
import './Table.css';
import PropTypes from 'prop-types';

const Table = ({
  className,
  columns,
  dataSource,
  isShowNum,
  isShowPaginition,
  onPageChange,
  onNumberItemChange,
  paginition
}) => {
  console.log(dataSource)
  const dataTable = dataSource?.map((row, index) => {
    let rowDatas = [];
    let i = 0;
    for (let key in columns) {
      rowDatas.push({
        key: columns[i].dataIndex,
        value: columns[i].render(row[columns[i].dataIndex], row),
        width: columns[i]?.width
      });
      i++;
    }
    return (
      <div key={index} className='table-container__row'>
        {rowDatas.map((rowData, indexData) => {
          return (
            <div
              className='table-container__row__item'
              style={{ width: rowData?.width }}
              key={indexData}
            >
              {rowData.value}
            </div>
          );
        })}
      </div>
    );
  });

  const paginition1 = {
      page: 1,
      size: 5,
      totalPage: 4,
      totalItem: 20
  }

  function handlePageChange(newPage){
    onPageChange(newPage)
  }

  function handleNumberItemChange(newNumber){
    onNumberItemChange(newNumber)
  }

  return (
    <div className={`table-container ${className}`}>
      <div className="table-container__header">
        {columns.map((col, index) => (
          <div
            style={{ width: col.width }}
            key={index}
            className="table-container__header__item"
          >
            {col.title}
          </div>
        ))}
      </div>
      <div className="table-container__content">
        {dataSource && dataSource.length >= 1 && dataTable}
        {(!dataSource || dataSource.length < 1) && (
          <div className="empty">
            <div className="logo"></div>
            <div className="text">Không có dữ liệu</div>
          </div>
        )}
        
      </div>
      {isShowPaginition && <Pagination
          pagination={paginition}
          onPageChange={handlePageChange}
          onNumberItemChange={handleNumberItemChange}
        ></Pagination>}
    </div>
  );
};

Table.propTypes = {
  tableData: PropTypes.arrayOf(PropTypes.object),
  headerData: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Table;
