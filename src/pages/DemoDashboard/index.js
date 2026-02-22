import React, { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  toggleModal,
  selectIsModalOpen,
  selectCategoryFilter,
  setCategoryFilter,
} from "../../features/payments/paymentSlice";
import {
  selectDemoPayments,
  selectHasUnsavedData,
  clearDemoData,
} from "../../features/demo/demoSlice";
import { selectIsPro } from "../../features/subscription/subscriptionSlice";
import { showNotification } from "../../features/notification/notificationSlice";
import { toLanding } from "../../routes";
import Header from "../Dashboard/Header";
import Stats from "../Dashboard/Stats";
import Charts from "../Dashboard/Charts";
import Filters from "../Dashboard/Filters";
import MiniPayments from "../Dashboard/MiniPayments";
import AddPaymentForm from "../Dashboard/Form";
import PaymentTypeSelector from "../Dashboard/PaymentTypeSelector";
import PaymentsList from "../Dashboard/List";
import ShoppingLists from "../Dashboard/ShoppingLists";
import Family from "../Dashboard/Family";
import Files from "../Dashboard/Files";
import AdBanner from "../../components/AdBanner";
import { ProfileMain } from "../Dashboard/Profile/ProfileMain";
import { Container as ProfileContainer } from "../Dashboard/Profile/styled";
import BottomNav from "../../components/BottomNav";
import SaveDataModal from "../../components/SaveDataModal";
import { useAppHistory } from "../../hooks/useAppHistory";
import * as S from "../Dashboard/styled";

const DemoDashboard = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isModalOpen = useSelector(selectIsModalOpen);
  const payments = useSelector(selectDemoPayments);
  const categoryFilter = useSelector(selectCategoryFilter);
  const hasUnsavedData = useSelector(selectHasUnsavedData);
  const isPro = useSelector(selectIsPro);
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
  const [showSaveModal, setShowSaveModal] = useState(false);

  // Przekształć dane demo na format zgodny z komponentami
  const transformedPayments = payments.map((payment) => ({
    ...payment,
    userId: "demo",
  }));

  // Przy odświeżeniu strony w trybie demo – wyczyść wszystkie dane demo
  useEffect(() => {
    const nav = performance.getEntriesByType?.("navigation")?.[0];
    if (nav?.type === "reload") {
      dispatch(clearDemoData());
    }
  }, [dispatch]);

  useEffect(() => {
    // Sprawdź czy użytkownik próbuje opuścić stronę
    const handleBeforeUnload = (e) => {
      if (hasUnsavedData) {
        e.preventDefault();
        e.returnValue = "";
        return "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [hasUnsavedData]);

  const handleTabChange = (newTab) => {
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
    setTimeout(() => {
      const element = document.getElementById(`payment-${paymentId}`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
        element.style.animation = "highlight 1s ease";
      }
    }, 100);
  };

  const handleBackToLanding = () => {
    if (hasUnsavedData) {
      setShowSaveModal(true);
    } else {
      navigate(toLanding());
    }
  };

  const handleContinueDemo = () => {
    setShowSaveModal(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <>
            <Stats payments={transformedPayments} />
            <MiniPayments
              payments={transformedPayments}
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
                  ← Wróć
                </S.CategoryBackButton>
              </S.CategoryBackBar>
            )}
            <PaymentsList
              payments={transformedPayments}
              collapseAll={collapseAllPayments}
              minDate={minDate}
              maxDate={maxDate}
              minAmount={minAmount}
              maxAmount={maxAmount}
              searchName={searchName}
              isDemo
            />
            {categoryFilter === "all" && (
              <Charts
                payments={transformedPayments}
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
          <>
            <S.DemoInfoBar>
              W trybie demo widzisz podgląd. Nie możesz tworzyć rodzin ani dodawać członków.
            </S.DemoInfoBar>
            <Family isDemo />
          </>
        );
      case "files":
        return (
          <>
            <S.DemoInfoBar>
              W trybie demo nie możesz dodawać załączników do płatności.
            </S.DemoInfoBar>
            <Files payments={transformedPayments} isDemo />
          </>
        );
      case "profile":
        return (
          <>
            <S.DemoInfoBar>
              W trybie demo nie możesz edytować profilu ani zarządzać kontem.
            </S.DemoInfoBar>
            <ProfileContainer>
              <ProfileMain
                userInitials="DU"
                userName="Demo Użytkownik"
                userEmail="demo@example.com"
                onSectionSelect={() =>
                  dispatch(
                    showNotification({
                      message: "Zarejestruj się, aby edytować profil i korzystać z tych funkcji.",
                      type: "info",
                    })
                  )
                }
                onContact={() =>
                  dispatch(
                    showNotification({
                      message: "Zarejestruj się, aby skontaktować się z nami.",
                      type: "info",
                    })
                  )
                }
                onAbout={() =>
                  dispatch(
                    showNotification({
                      message: "📱 " + t("profile.version"),
                      type: "success",
                    })
                  )
                }
                isDemo
              />
            </ProfileContainer>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <S.Wrapper>
      <S.DemoBanner>
        <S.DemoBannerText>
          🎯 Tryb demo - dane są przechowywane tylko lokalnie.{" "}
          <S.DemoBannerLink onClick={() => setShowSaveModal(true)}>
            Zarejestruj się, aby zachować dane
          </S.DemoBannerLink>
        </S.DemoBannerText>
        <S.DemoBannerClose onClick={handleBackToLanding}>✕</S.DemoBannerClose>
      </S.DemoBanner>
      <S.HeaderRow>
        <S.HeaderSpacer />
        <S.HeaderCenter>
          <Header
            onAddPayment={handleAddPayment}
            onToggleFilters={() => setShowFilters(!showFilters)}
            showFilters={showFilters}
            hideFilters={
              activeTab === "shopping" || activeTab === "family" || activeTab === "files" || activeTab === "profile"
            }
            hideAddPayment={
              activeTab === "shopping" || activeTab === "family" || activeTab === "files" || activeTab === "profile"
            }
          />
        </S.HeaderCenter>
        <S.HeaderSpacer />
      </S.HeaderRow>
      <S.DesktopLayout>
        <S.LeftAdArea $isEmpty={isPro} />
        <S.MainContent>
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
        </S.MainContent>
        <S.RightAdArea>
          <AdBanner />
        </S.RightAdArea>
      </S.DesktopLayout>
      <BottomNav
        activeTab={activeTab}
        onTabChange={handleTabChange}
        isDemo
        onExitDemo={handleBackToLanding}
      />
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
          isDemo={true}
        />
      )}
      {showSaveModal && (
        <SaveDataModal
          onClose={() => setShowSaveModal(false)}
          onContinue={handleContinueDemo}
        />
      )}
    </S.Wrapper>
  );
};

export default DemoDashboard;
