import DashboardLayout from "../layout/DashboardLayout";
import ExpenseForm from "../expenses/ExpenseForm";
import ExpenseList from "../expenses/ExpenseList";
import BalanceCard from "../component/Balancecard";
import SummaryCards from "../component/SummaryCards.jsx";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <BalanceCard />
       <SummaryCards /> 
      <ExpenseForm />
      <ExpenseList />
    </DashboardLayout>
  );
}
