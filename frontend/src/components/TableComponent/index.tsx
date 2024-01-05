import { Table, TableProps } from "antd";
import React from "react";
import Loading from "../LoadingComponent";

interface TableComponentProps extends TableProps<any> {
  data?: any[];
  isPending?: boolean;
}

const TableComponent: React.FC<TableComponentProps> = ({
  data = [],
  isPending = false,
  columns = [],
  ...props
}) => {
  return (
    <Loading isPending={isPending}>
      <Table columns={columns} dataSource={data} {...props} />
    </Loading>
  );
};

export default TableComponent;
