import React, { useEffect, useState, useRef, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../api/firebase";
import {
  toggleModal,
  selectIsModalOpen,
  selectPayments,
  selectCategoryFilter,
  setCategoryFilter,
  fetchPaymentsRequest,
} from "../../features/payments/paymentSlice";

import { fetchSubscriptionRequest } from "../../features/subscription/subscriptionSlice";
import { selectUser } from "../../features/auth/authSlice";
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
import AdBanner from "../../components/AdBanner";
import TermsModal from "../../components/TermsModal";
import { useAppHistory } from "../../hooks/useAppHistory";
import * as S from "./styled";

const Dashboard = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const isModalOpen = useSelector(selectIsModalOpen);
  const payments = useSelector(selectPayments);
  const categoryFilter = useSelector(selectCategoryFilter);
  const scrollBeforeCategoryRef = useRef(null);
  const { viewState, pushView, goBack } = useAppHistory({ tab: "dashboard" });
  const activeTab = viewState.tab || "dashboard";
  const scrollPositions = useRef({});
  const [showFilters, setShowFilters] = useState(false);
  const [showTypeSelector, setShowTypeSelector] = useState(false);
  const [selectedPaymentType, setSelectedPaymentType] = useState(null);
  const [collapseAllPayments] = useState(false);
  const [minDate, setMinDate] = useState("");
  const [maxDate, setMaxDate] = useState("");
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");
  const [searchName, setSearchName] = useState("");
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [termsRequired, setTermsRequired] = useState(false);

  useEffect(() => {
    dispatch(fetchPaymentsRequest());
  }, [dispatch]);

  const checkTermsAcceptance = useCallback(async () => {
    if (!user?.uid) return;
    
    try {
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const data = userDoc.data();
        if (!data.termsAccepted || !data.termsAcceptedAt) {
          setTermsRequired(true);
          setShowTermsModal(true);
        }
      } else {
        // Nowy użytkownik - wymagamy akceptacji
        setTermsRequired(true);
        setShowTermsModal(true);
      }
    } catch (error) {
      console.error("Błąd podczas sprawdzania akceptacji regulaminu:", error);
    }
  }, [user?.uid]);

  useEffect(() => {
    checkTermsAcceptance();
  }, [checkTermsAcceptance]);

  const handleTermsAccept = () => {
    setShowTermsModal(false);
    setTermsRequired(false);
  };

  useEffect(() => {
    if (user?.uid) {
      dispatch(fetchSubscriptionRequest({ uid: user.uid }));
    }
  }, [dispatch, user?.uid]);

  const handleTabChange = (newTab) => {
    const sameTab =
      newTab === activeTab &&
      !viewState.familyPanel &&
      !viewState.profileSection &&
      !viewState.shoppingListId;
    if (sameTab) return;
    scrollPositions.current[activeTab] = window.scrollY ?? document.documentElement.scrollTop;
    pushView({
      tab: newTab,
      familyView: null,
      familyPanel: null,
      profileSection: null,
      shoppingListId: null,
    });
  };

  useEffect(() => {
    const pos = scrollPositions.current[activeTab];
    const restore = () => {
      if (pos !== undefined && pos > 0) {
        window.scrollTo({ top: pos, behavior: "instant" });
      } else {
        window.scrollTo({ top: 0, behavior: "instant" });
      }
    };
    requestAnimationFrame(() => {
      requestAnimationFrame(restore);
    });
  }, [activeTab]);

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
    handleTabChange("payments");
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
            {categoryFilter !== "all" && (
              <S.CategoryBackBar>
                <S.CategoryBackButton onClick={() => dispatch(setCategoryFilter("all"))}>
                  ← {t("common.back")}
                </S.CategoryBackButton>
              </S.CategoryBackBar>
            )}
            <PaymentsList
              collapseAll={collapseAllPayments}
              minDate={minDate}
              maxDate={maxDate}
              minAmount={minAmount}
              maxAmount={maxAmount}
              searchName={searchName}
            />
            {categoryFilter === "all" && (
              <Charts
                payments={payments}
                onBeforeCategorySelect={() => {
                  scrollBeforeCategoryRef.current =
                    window.scrollY ?? document.documentElement.scrollTop;
                }}
              />
            )}
          </>
        );
      case "shopping":
        return (
          <ShoppingLists
            selectedListId={viewState.shoppingListId}
            onSelectList={(list) => pushView({ tab: "shopping", shoppingListId: list?.id ?? null })}
            onBack={goBack}
          />
        );
      case "family":
        return (
          <Family
            activeView={viewState.familyView}
            activePanel={viewState.familyPanel}
            onNavigate={(patch) => pushView({ tab: "family", ...patch })}
            onBack={goBack}
          />
        );
      case "files":
        return <Files />;
      case "profile":
        return (
          <Profile
            activeSection={viewState.profileSection}
            onNavigate={(patch) => pushView({ tab: "profile", ...patch })}
            onBack={goBack}
          />
        );
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
          onBack={goBack}
          showBack={
            activeTab === "shopping" ||
            activeTab === "family" ||
            activeTab === "files" ||
            activeTab === "profile"
          }
          hideFilters={
            activeTab === "shopping" ||
            activeTab === "family" ||
            activeTab === "files" ||
            activeTab === "profile"
          }
          hideAddPayment={
            activeTab === "shopping" ||
            activeTab === "family" ||
            activeTab === "files" ||
            activeTab === "profile"
          }
        />
        {(showFilters || window.innerWidth >= 768) &&
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
                searchName={searchName}
                setMinDate={setMinDate}
                setMaxDate={setMaxDate}
                setMinAmount={setMinAmount}
                setMaxAmount={setMaxAmount}
                setSearchName={setSearchName}
              />
            </S.FiltersBox>
          )}
        {renderContent()}
        <AdBanner />
      </S.Container>
      <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
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
      {showTermsModal && (
        <TermsModal
          required={termsRequired}
          showAcceptedDate={!termsRequired}
          onAccept={handleTermsAccept}
        />
      )}
    </S.Wrapper>
  );
};

export default Dashboard;
