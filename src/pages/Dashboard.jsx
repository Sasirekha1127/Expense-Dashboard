import DashboardLayout from "../layout/DashboardLayout";
import ExpenseForm from "../expenses/ExpenseForm";
import ExpenseList from "../expenses/ExpenseList";
import BalanceCard from "../component/Balancecard";
import SummaryCards from "../component/SummaryCards.jsx";
import DepositBox from "../component/DepositBox.jsx";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <BalanceCard />
      <DepositBox />
      <SummaryCards />
      <ExpenseForm />
      <ExpenseList />
    </DashboardLayout>
  );
}
