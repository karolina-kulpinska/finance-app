import styled from "styled-components";

export const Banner = styled.div`
  margin: 16px 0;
  padding: 20px;
  background: #f5f5f5;
  border: 1px dashed #ccc;
  border-radius: 12px;
  text-align: center;
`;

export const Label = styled.div`
  font-size: 10px;
  font-weight: 700;
  color: #999;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 6px;
`;

export const Placeholder = styled.div`
  font-size: 13px;
  color: #666;
`;

/* Lara / Avalon banner */
export const AvalonCard = styled.a`
  display: block;
  margin: 8px 0 16px 0;
  padding: 16px;
  background: linear-gradient(135deg, #fafbfc 0%, #fff 50%);
  border: 2px solid rgba(140, 80, 20, 0.5);
  border-radius: 12px;
  text-decoration: none;
  color: inherit;
  transition: box-shadow 0.2s, transform 0.2s;
  text-align: center;

  &:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
    transform: translateY(-1px);
  }
`;

export const AvalonCardPro = styled(AvalonCard)`
  padding: 10px 14px;
  margin: 24px 0 16px 0;
  border: 1px solid rgba(180, 150, 120, 0.25);
`;

export const AvalonContentWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

export const AvalonMainTitle = styled.div`
  font-size: ${({ $small }) => ($small ? "12px" : "16px")};
  font-weight: 800;
  color: #1a1a1a;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: ${({ $small }) => ($small ? "10px" : "14px")};
  line-height: 1.2;
  text-align: center;

  @media (min-width: 768px) {
    font-size: ${({ $small }) => ($small ? "12px" : "20px")};
  }
`;

export const AvalonLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${({ $small }) => ($small ? "12px" : "16px")};

  @media (min-width: 768px) {
    flex-direction: row;
    gap: ${({ $small }) => ($small ? "12px" : "20px")};
  }
`;

export const AvalonRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const AvalonIcon = styled.span`
  font-size: 28px;
  flex-shrink: 0;
`;

export const AvalonContent = styled.div`
  flex: 1;
  min-width: 0;
`;

export const AvalonText = styled.div`
  width: 100%;
  max-width: 520px;
  margin-top: 12px;
  text-align: center;
`;

export const AvalonHook = styled.div`
  font-size: ${({ $small }) => ($small ? "11px" : "13px")};
  font-weight: 600;
  color: #8b4513;
  margin-bottom: ${({ $small }) => ($small ? "4px" : "6px")};
`;

export const AvalonHeadline = styled.div`
  font-size: ${({ $small }) => ($small ? "12px" : "16px")};
  font-weight: 700;
  color: #333;
  line-height: 1.3;
  margin-bottom: ${({ $small }) => ($small ? "6px" : "10px")};
`;

export const AvalonBody = styled.div``;

export const AvalonParagraph = styled.p`
  font-size: ${({ $small }) => ($small ? "11px" : "12px")};
  color: #2d2d2d;
  line-height: 1.5;
  margin: 0 0 ${({ $small }) => ($small ? "6px" : "10px")} 0;
`;

export const AvalonClosing = styled.div`
  font-size: ${({ $small }) => ($small ? "11px" : "12px")};
  font-weight: 600;
  color: #8b4513;
  margin-top: 8px;
`;

export const AvalonSubline = styled.div`
  font-size: ${({ $small }) => ($small ? "10px" : "12px")};
  color: #666;
  line-height: 1.4;
`;

export const AvalonTitle = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: #333;
  margin-bottom: 2px;
`;

export const AvalonSubtitle = styled.div`
  font-size: 12px;
  color: #666;
  line-height: 1.4;
`;

export const AvalonActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
`;

export const AvalonLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  font-size: 13px;
  font-weight: 600;
  border-radius: 8px;
  text-decoration: none;
  transition: opacity 0.2s, transform 0.2s;

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }
`;

export const AvalonLinkPrimary = styled(AvalonLink)`
  background: linear-gradient(135deg, #d2691e 0%, #b8860b 100%);
  color: white;
  box-shadow: 0 2px 8px rgba(210, 105, 30, 0.3);
`;

export const AvalonLinkSecondary = styled(AvalonLink)`
  background: #f0f0f0;
  color: #333;
  border: 1px solid #ddd;
`;

export const AvalonProLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  color: #888;
  text-decoration: none;
  padding: 4px 0;

  &:hover {
    color: #d2691e;
  }
`;

export const UlotkaImg = styled.img`
  display: block;
  width: auto;
  height: auto;
  max-width: ${({ $small }) => ($small ? "190px" : "240px")};
  max-height: ${({ $small }) => ($small ? "240px" : "320px")};
  object-fit: contain;
  pointer-events: none;
`;

export const UlotkaWrap = styled.div`
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  background: #f8fafc;
  display: flex;
  justify-content: center;
  align-items: center;
`;
