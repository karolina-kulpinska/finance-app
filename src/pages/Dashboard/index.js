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
import PaymentsList from "./List";
import ShoppingLists from "./ShoppingLists";
import Profile from "./Profile";
import BottomNav from "../../components/BottomNav";
import * as S from "./styled";

const Dashboard = () => {
  const dispatch = useDispatch();
  const isModalOpen = useSelector(selectIsModalOpen);
  const payments = useSelector(selectPayments);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showFilters, setShowFilters] = useState(false);
  const [showPaymentFilters, setShowPaymentFilters] = useState(false);

  useEffect(() => {
    dispatch(fetchPaymentsRequest());
  }, [dispatch]);

  const handleAddPayment = () => {
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
            {showFilters && (
              <S.DashboardFiltersWrapper>
                <Filters />
              </S.DashboardFiltersWrapper>
            )}
            <MiniPayments payments={payments} onPaymentClick={handlePaymentClick} />
          </>
        );
      case "payments":
        return (
          <>
            <S.PaymentsHeader>
              <S.PaymentsHeaderTop>
                <S.PaymentsTitle>Wszystkie płatności ({payments.length})</S.PaymentsTitle>
                <S.FilterToggleButton onClick={() => setShowPaymentFilters(!showPaymentFilters)}>
                  {showPaymentFilters ? "▲ Ukryj filtry" : "▼ Filtry"}
                </S.FilterToggleButton>
              </S.PaymentsHeaderTop>
              {showPaymentFilters && (
                <S.FiltersWrapper>
                  <Filters />
                </S.FiltersWrapper>
              )}
            </S.PaymentsHeader>
            <PaymentsList />
            <Charts payments={payments} />
          </>
        );
      case "shopping":
        return <ShoppingLists />;
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
        />
        {renderContent()}
      </S.Container>
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      {isModalOpen && <AddPaymentForm />}
    </S.Wrapper>
  );
};

export default Dashboard;
