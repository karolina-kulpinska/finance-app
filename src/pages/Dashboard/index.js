import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleModal,
  selectIsModalOpen,
  selectPayments,
  fetchPaymentsRequest,
} from "../../features/payments/paymentSlice";
import Header from "./Header";
import Stats from "./Stats";
import Charts from "./Charts";
import Filters from "./Filters";
import MiniPayments from "./MiniPayments";
import AddPaymentForm from "./Form";
import PaymentTypeSelector from "./PaymentTypeSelector";
import PaymentsList from "./List";
import ShoppingLists from "./ShoppingLists";
import Profile from "./Profile";
import Files from "./Files";
import Family from "./Family";
import BottomNav from "../../components/BottomNav";
import * as S from "./styled";

const Dashboard = () => {
  const dispatch = useDispatch();
  const isModalOpen = useSelector(selectIsModalOpen);
  const payments = useSelector(selectPayments);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showFilters, setShowFilters] = useState(false);
  const [showTypeSelector, setShowTypeSelector] = useState(false);
  const [selectedPaymentType, setSelectedPaymentType] = useState(null);
  const [collapseAllPayments, setCollapseAllPayments] = useState(false);
  const [minDate, setMinDate] = useState("");
  const [maxDate, setMaxDate] = useState("");
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");

  useEffect(() => {
    dispatch(fetchPaymentsRequest());
  }, [dispatch]);

  const handleAddPayment = () => {
    setShowTypeSelector(true);
  };

  const handleSelectType = (type) => {
    setSelectedPaymentType(type);
    setShowTypeSelector(false);
    dispatch(toggleModal());
  };

  const handleCloseForm = () => {
    setSelectedPaymentType(null);
    dispatch(toggleModal());
  };

  const handlePaymentClick = (paymentId) => {
    setActiveTab("payments");
    // Scroll do płatności po małym opóźnieniu
    setTimeout(() => {
      const element = document.getElementById(`payment-${paymentId}`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
        element.style.animation = "highlight 1s ease";
      }
    }, 100);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <>
            <Stats payments={payments} />
            <MiniPayments
              payments={payments}
              onPaymentClick={handlePaymentClick}
            />
          </>
        );
      case "payments":
        return (
          <>
            <S.PaymentsHeader>
              <S.PaymentsTitle>
                Wszystkie płatności ({payments.length})
              </S.PaymentsTitle>
              <S.CollapseButton
                onClick={() => setCollapseAllPayments(!collapseAllPayments)}
              >
                {collapseAllPayments ? "Rozwiń" : "Zwiń"}
              </S.CollapseButton>
            </S.PaymentsHeader>
            <PaymentsList
              collapseAll={collapseAllPayments}
              minDate={minDate}
              maxDate={maxDate}
              minAmount={minAmount}
              maxAmount={maxAmount}
            />
            <Charts payments={payments} />
          </>
        );
      case "shopping":
        return <ShoppingLists />;
      case "family":
        return <Family />;
      case "files":
        return <Files />;
      case "profile":
        return <Profile />;
      default:
        return null;
    }
  };

  return (
    <S.Wrapper>
      <S.Container>
        <Header
          onAddPayment={handleAddPayment}
          onToggleFilters={() => setShowFilters(!showFilters)}
          showFilters={showFilters}
          hideFilters={
            activeTab === "shopping" ||
            activeTab === "family" ||
            activeTab === "files" ||
            activeTab === "profile"
          }
        />
        {showFilters &&
          activeTab !== "shopping" &&
          activeTab !== "family" &&
          activeTab !== "files" &&
          activeTab !== "profile" && (
            <S.FiltersBox>
              <Filters
                minDate={minDate}
                maxDate={maxDate}
                minAmount={minAmount}
                maxAmount={maxAmount}
                setMinDate={setMinDate}
                setMaxDate={setMaxDate}
                setMinAmount={setMinAmount}
                setMaxAmount={setMaxAmount}
              />
            </S.FiltersBox>
          )}
        {renderContent()}
      </S.Container>
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      {showTypeSelector && (
        <PaymentTypeSelector
          onSelectType={handleSelectType}
          onClose={() => setShowTypeSelector(false)}
        />
      )}
      {isModalOpen && (
        <AddPaymentForm
          paymentType={selectedPaymentType}
          onClose={handleCloseForm}
        />
      )}
    </S.Wrapper>
  );
};

export default Dashboard;
