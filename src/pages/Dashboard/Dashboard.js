import React, { useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
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
import { Doughnut, Line } from "react-chartjs-2";

import { IncomeAPI } from "../../apis/IncomeAPI";
import { OutcomeAPI } from "../../apis/OutcomeAPI";

import ChartCard from "../../components/Chart/ChartCard";

import ChartLegend from "../../components/Chart/ChartLegend";
import { lineOptions, lineLegends } from "../../utils/demo/chartsData";

import TableDashboard from "./TableDashboard";
import ThemedSuspense from "../../components/ThemedSuspense";

function Dashboard() {
  const user = useSelector((state) => state.user.currentUser);
  const [amountDoughnut, setAmountDoughnut] = useState({
    income: 0,
    outcome: 0,
  });

  const [incomeStats, setIncomeStats] = useState([]);
  const [outcomeStats, setOutcomeStats] = useState([]);

  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const getDataDoughnut = async () => {
      const income = await IncomeAPI.total(user.token);
      const outcome = await OutcomeAPI.total(user.token);
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
      ...doughnutOptions.data,
      datasets: [
        {
          data: [amountDoughnut.outcome, amountDoughnut.income],
          backgroundColor: ["#7e3af2", "#047481"],
        },
      ],
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
      const income = await IncomeAPI.stats(user.token);
      income.forEach((data) => {
        setIncomeStats((prev) => [...prev, data]);
      });

      const outcome = await OutcomeAPI.stats(user.token);
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
          ...lineOptions.data.datasets[0],
          data: incomeStats.map((data) => data.amount),
        },
        {
          ...lineOptions.data.datasets[1],
          data: outcomeStats.map((data) => data.amount),
        },
      ],
    },
  };

  useEffect(() => {
    const getTransactions = async () => {
      const incomes = await IncomeAPI.getAll(user.token);
      incomes.map((income) => {
        income.status = "Income";
      });
      const outcomes = await OutcomeAPI.getAll(user.token);
      outcomes.map((outcome) => {
        outcome.status = "Outcome";
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

  return amountDoughnut.income &&
    amountDoughnut.outcome &&
    incomeStats.length &&
    outcomeStats.length &&
    transactions.length ? (
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
                    key={i}
                    status={transaction.status}
                  />
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  ) : (
    <ThemedSuspense />
  );
}

export default Dashboard;
