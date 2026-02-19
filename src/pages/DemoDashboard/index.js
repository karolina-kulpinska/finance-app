import React, { useEffect, useState, useRef } from "react";
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
} from "../../features/demo/demoSlice";
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
import BottomNav from "../../components/BottomNav";
import SaveDataModal from "../../components/SaveDataModal";
import * as S from "../Dashboard/styled";

const DemoDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isModalOpen = useSelector(selectIsModalOpen);
  const payments = useSelector(selectDemoPayments);
  const categoryFilter = useSelector(selectCategoryFilter);
  const hasUnsavedData = useSelector(selectHasUnsavedData);
  const scrollBeforeCategoryRef = useRef(null);
  const [activeTab, setActiveTab] = useState("dashboard");
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
    setActiveTab(newTab);
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
                <S.CategoryBackButton
                  onClick={() => {
                    dispatch(setCategoryFilter("all"));
                    const pos = scrollBeforeCategoryRef.current;
                    requestAnimationFrame(() => {
                      requestAnimationFrame(() => {
                        window.scrollTo({
                          top: pos ?? 0,
                          behavior: "instant",
                        });
                      });
                    });
                  }}
                >
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
        return <ShoppingLists />;
      case "family":
        return (
          <S.DemoInfoBox>
            <S.DemoInfoIcon>👨‍👩‍👧‍👦</S.DemoInfoIcon>
            <S.DemoInfoTitle>Rodzina</S.DemoInfoTitle>
            <S.DemoInfoText>
              W trybie demo możesz zobaczyć jak działa funkcja udostępniania danych rodzinie, ale nie możesz tworzyć rodzin ani dodawać członków.
            </S.DemoInfoText>
            <S.DemoInfoText>
              <strong>Zarejestruj się</strong>, aby móc tworzyć rodziny i udostępniać płatności oraz listy zakupów członkom rodziny.
            </S.DemoInfoText>
          </S.DemoInfoBox>
        );
      case "files":
        return (
          <S.DemoInfoBox>
            <S.DemoInfoIcon>📎</S.DemoInfoIcon>
            <S.DemoInfoTitle>Pliki</S.DemoInfoTitle>
            <S.DemoInfoText>
              W trybie demo nie możesz dodawać załączników do płatności (skany rachunków, faktur, paragonów).
            </S.DemoInfoText>
            <S.DemoInfoText>
              <strong>Zarejestruj się</strong>, aby móc przesyłać i przechowywać pliki związane z płatnościami.
            </S.DemoInfoText>
          </S.DemoInfoBox>
        );
      case "profile":
        return (
          <S.DemoInfoBox>
            <S.DemoInfoIcon>👤</S.DemoInfoIcon>
            <S.DemoInfoTitle>Profil</S.DemoInfoTitle>
            <S.DemoInfoText>
              W trybie demo możesz przeglądać funkcje profilu, ale nie możesz edytować danych osobowych ani zarządzać kontem.
            </S.DemoInfoText>
            <S.DemoInfoText>
              <strong>Zarejestruj się</strong>, aby móc edytować profil, zmieniać hasło, zarządzać subskrypcją i usuwać konto.
            </S.DemoInfoText>
            <S.DemoInfoButton onClick={() => setShowSaveModal(true)}>
              Zarejestruj się teraz
            </S.DemoInfoButton>
          </S.DemoInfoBox>
        );
      default:
        return null;
    }
  };

  return (
    <S.Wrapper>
      <S.Container>
        <S.DemoBanner>
          <S.DemoBannerText>
            🎯 Tryb demo - dane są przechowywane tylko lokalnie.{" "}
            <S.DemoBannerLink onClick={() => setShowSaveModal(true)}>
              Zarejestruj się, aby zachować dane
            </S.DemoBannerLink>
          </S.DemoBannerText>
          <S.DemoBannerClose onClick={handleBackToLanding}>✕</S.DemoBannerClose>
        </S.DemoBanner>
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
