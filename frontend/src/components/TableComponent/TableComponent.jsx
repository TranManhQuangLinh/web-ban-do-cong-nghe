import { Table } from "antd";
import React from "react";
import Loading from "../../components/LoadingComponent/Loading";
import { useMemo } from "react";

const TableComponent = (props) => {
  const { data: dataSource = [], isPending = false, columns = [] } = props;

  useMemo(() => {
    const arr = columns?.filter((col) => col.dataIndex !== "action");
    return arr;
  }, [columns]);

  return (
    <Loading isPending={isPending}>
      <Table columns={columns} dataSource={dataSource} {...props} />
    </Loading>
  );
};

export default TableComponent;
