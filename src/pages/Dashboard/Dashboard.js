import React, { useState, useEffect, useMemo } from "react";
import moment from "moment";

import PageTitle from "../../components/Typography/PageTitle";

import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableContainer,
} from "@windmill/react-ui";

import { doughnutOptions, doughnutLegends } from "../../utils/demo/chartsData";
import { Doughnut, Line, Bar } from "react-chartjs-2";

import { IncomeAPI } from "../../apis/IncomeAPI";
import { OutcomeAPI } from "../../apis/OutcomeAPI";

import ChartCard from "../../components/Chart/ChartCard";

import ChartLegend from "../../components/Chart/ChartLegend";
import { lineOptions, lineLegends } from "../../utils/demo/chartsData";

import response from "../../utils/demo/tableData";
import TableDashboard from "./TableDashboard";
import { useSelector } from "react-redux";
// make a copy of the data, for the second table
const response2 = response.concat([]);

function Dashboard() {
  /**
   * DISCLAIMER: This code could be badly improved, but for the sake of the example
   * and readability, all the logic for both table are here.
   * You would be better served by dividing each table in its own
   * component, like Table(?) and TableWithActions(?) hiding the
   * presentation details away from the page view.
   */

  // setup pages control for every table
  const [pageTable1, setPageTable1] = useState(1);
  const [pageTable2, setPageTable2] = useState(1);

  // setup data for every table
  const [dataTable1, setDataTable1] = useState([]);
  const [dataTable2, setDataTable2] = useState([]);

  const user = useSelector((state) => state.user.currentUser);

  const [amountDoughnut, setAmountDoughnut] = useState({
    income: 0,
    outcome: 0,
  });

  const [length, setLength] = useState(0);

  const [incomeStats, setIncomeStats] = useState([]);
  const [outcomeStats, setOutcomeStats] = useState([]);

  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const getDataDoughnut = async () => {
      const income = await IncomeAPI.total();
      const outcome = await OutcomeAPI.total();
      setAmountDoughnut({
        income: income[0].amount,
        outcome: outcome[0].amount,
      });
    };
    getDataDoughnut();
  }, []);

  const dataDoughnut = {
    ...doughnutOptions,
    data: {
      datasets: [
        {
          data: [amountDoughnut.outcome, amountDoughnut.income],
          /**
           * These colors come from Tailwind CSS palette
           * https://tailwindcss.com/docs/customizing-colors/#default-color-palette
           */
          backgroundColor: ["#7e3af2", "#047481"],
        },
      ],
      labels: ["Outcome", "Income"],
    },
  };
  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  useEffect(() => {
    const getDataLine = async () => {
      const income = await IncomeAPI.stats();
      income.forEach((data) => {
        setIncomeStats((prev) => [...prev, data]);
      });

      const outcome = await OutcomeAPI.stats();
      outcome.forEach((data) => {
        setOutcomeStats((prev) => [...prev, data]);
      });
    };
    getDataLine();
  }, []);

  const dataLine = {
    ...lineOptions,
    data: {
      labels:
        incomeStats.length > outcomeStats.length
          ? incomeStats.map((data) => MONTHS[data.month - 1])
          : outcomeStats.map((data) => MONTHS[data.month - 1]),
      datasets: [
        {
          label: "Income",
          /**
           * These colors come from Tailwind CSS palette
           * https://tailwindcss.com/docs/customizing-colors/#default-color-palette
           */
          backgroundColor: "#047481",
          borderColor: "#047481",
          data: incomeStats.map((data) => data.amount),
          fill: false,
        },
        {
          label: "Outcome",
          fill: false,
          /**
           * These colors come from Tailwind CSS palette
           * https://tailwindcss.com/docs/customizing-colors/#default-color-palette
           */
          backgroundColor: "#7e3af2",
          data: outcomeStats.map((data) => data.amount),
          borderColor: "#7e3af2",
        },
      ],
    },
  };

  useEffect(() => {
    const getTransactions = async () => {
      const incomes = await IncomeAPI.getAll();
      incomes.map((income) => {
        income.status = "income";
      });
      const outcomes = await OutcomeAPI.getAll();
      outcomes.map((outcome) => {
        outcome.status = "outcome";
      });

      setTransactions([
        ...[...incomes, ...outcomes].sort(
          (a, b) =>
            new Date(
              moment(b.created_at).format("MMMM DD YYYY, h:mm:ss")
            ).getTime() -
            new Date(
              moment(a.created_at).format("MMMM DD YYYY, h:mm:ss")
            ).getTime()
        ),
      ]);
    };

    getTransactions();
  }, []);

  return (
    <>
      <PageTitle>Dashboard</PageTitle>
      <div className="grid grid-cols-2 gap-6 mb-8">
        <ChartCard title="" className="col-span-1">
          <Line {...dataLine} />
          <ChartLegend legends={lineLegends} />
        </ChartCard>

        <ChartCard title="" className="col-span-1">
          <Doughnut {...dataDoughnut} />
          <ChartLegend legends={doughnutLegends} />
        </ChartCard>

        <TableContainer className="col-span-2">
          <Table>
            <TableHeader>
              <tr>
                <TableCell>Product</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Date</TableCell>
              </tr>
            </TableHeader>
            <TableBody>
              {transactions &&
                transactions.map((transaction, i) => (
                  <TableDashboard
                    transaction={transaction}
                    productId={transaction.product_id}
                    key={i}
                    status={transaction.status}
                  />
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}

export default Dashboard;
