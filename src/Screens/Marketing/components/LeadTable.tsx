/* eslint-disable */
// Copyright 2022-2023 @Kotlang/navachaar-admin-portal authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import React from 'react';
import { Table } from 'antd';
import type { TablePaginationConfig, TableProps } from 'antd';
import { ILeadTableDataType } from 'src/types/marketting.d';

/**
 * Props for the LeadsTable component
 */
interface LeadsTableProps {
  data: ILeadTableDataType[] | undefined; // Data to display in the table
  loading: boolean; // Loading indicator
  pagination: TablePaginationConfig | undefined; // Pagination configuration
  onChange: TableProps<ILeadTableDataType>['onChange']; // Event handler for table changes
  columnsToDisplay?: string[]; // Columns to display in the table if not specified, all columns will be displayed
}


/**
 * Component for displaying leads table
 * @param {LeadsTableProps} props - Props for the component
 * @returns {JSX.Element} - Leads table component
 */
const LeadsTable: React.FC<LeadsTableProps> = ({
  data,
  loading,
  pagination,
  onChange,
  columnsToDisplay = []
}: LeadsTableProps): JSX.Element => {

  // Table columns for leads
  const allColumns: TableProps<ILeadTableDataType>['columns'] = [
    {
      dataIndex: 'userName',
      key: 'userName',
      title: 'NAME'
    },
    {
      dataIndex: 'phoneNo',
      key: 'phoneNo',
      title: 'PHONE NO.'
    },
    {
      dataIndex: 'appStatus',
      key: 'appStatus',
      render: (appStatus: string) => {
        return (
          <span className={`${appStatus === 'I' ? 'text-green-500' : ''}`}>
            {appStatus === 'I' ? 'Installed' : 'Not Installed'}
          </span>
        );
      },
      title: 'APP STATUS'
    },
    {
      dataIndex: 'type',
      key: 'type',
      title: 'TYPE'
    },
    {
      dataIndex: 'lastMessage',
      key: 'lastMessage',
      title: 'LAST MESSAGE'
    },
    {
      dataIndex: 'consent',
      key: 'consent',
      render: (consent: string) => {
        return (
          <span className={`${consent === 'Accepted' ? 'text-green-500' : ''}`}>
            {consent}
          </span>
        );
      },
      title: 'CONSENT'
    },
    {
      dataIndex: 'userId',
      key: 'userId',
      render: (userId: string) => {
        return (
          <div className="flex w-[50%]">
            <a href={`/marketing/leaddetails/${userId}`}>
              <svg
                className="h-6 w-6 text-gray-300"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </a>
          </div>
        );
      }
    }
  ];


  // If columnsToDisplay is empty, render all columns
  const columns = columnsToDisplay.length > 0
    ? allColumns.filter(column => column.key !== undefined && columnsToDisplay.includes(column.key as string))
    : allColumns;

  return (
      <Table
        columns={columns}
        rowKey={(record) => record.userId}
        dataSource={data}
        pagination={pagination}
        loading={loading}
        onChange={onChange}
      />
  );
};

export default LeadsTable;
