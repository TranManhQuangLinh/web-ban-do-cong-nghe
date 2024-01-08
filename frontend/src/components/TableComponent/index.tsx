import { Button, Space, Table, TableProps } from "antd";
import React, { useRef } from "react";
import Loading from "../LoadingComponent";
import { FilterDropdownProps } from "antd/es/table/interface";
import InputComponent from "../InputComponent";
import { SearchOutlined } from "@ant-design/icons";

interface TableComponentProps extends TableProps<any> {
  isPending?: boolean;
}
const TableComponent: React.FC<TableComponentProps> = ({
  isPending = false,
  ...props
}) => {
  const searchInput = useRef();

  const handleSearch = (
    selectedKeys: FilterDropdownProps["selectedKeys"],
    confirm: FilterDropdownProps["confirm"],
    dataIndex: string
  ) => {
    confirm();
  };

  const handleReset = (clearFilters: FilterDropdownProps["clearFilters"]) => {
    if (clearFilters) clearFilters();
  };

  const getColumnSearchProps = (dataIndex: string) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }: FilterDropdownProps) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <InputComponent
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => {
              clearFilters && handleReset(clearFilters);
              handleSearch(selectedKeys, confirm, dataIndex);
            }}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value: string, record: any) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    // onFilterDropdownOpenChange: (visible: boolean) => {
    //   if (visible && searchInput.current) {
    //     setTimeout(() => searchInput.current?.select(), 100);
    //   }
    // },
  });

  // console.log(columns);

  return (
    <Loading isPending={isPending}>
      <Table
        columns={props.columns?.map((column: any) => {
          // console.log({ ...column, ...getColumnSearchProps(column.dataIndex) });
          return { ...column, ...getColumnSearchProps(column.dataIndex) };
        })}
        dataSource={props.dataSource}
        {...props}
      />
    </Loading>
  );
};

export default TableComponent;
