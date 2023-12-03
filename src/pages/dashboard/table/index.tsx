import { StatusOnlineIcon } from "@heroicons/react/outline";
import {
  Badge,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Text,
  Title,
} from "@tremor/react";

interface TableExampleProps {
    data: any;
  }

export const TableExample = (props: TableExampleProps) => (
  <Card>
    <Title>List Exes</Title>
    <Table className="mt-5">
      <TableHead>
        <TableRow>
          <TableHeaderCell>Id</TableHeaderCell>
          <TableHeaderCell>StartTime</TableHeaderCell>
          <TableHeaderCell>Project Name</TableHeaderCell>
          <TableHeaderCell>Status</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {props.data.map((item: any) => (
          <TableRow key={item.id}>
            <TableCell>{item.id}</TableCell>
            <TableCell>
              <Text>{item.startTime}</Text>
            </TableCell>
            <TableCell>
              <Text>{item.project.name}</Text>
            </TableCell>
            <TableCell>
              <Badge color="emerald" icon={StatusOnlineIcon}>
                {item.status}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Card>
);