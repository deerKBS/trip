import Styled from 'vue3-styled-components';

const Content = Styled.div`
    background: ${({ theme }) => theme[theme.mainContent]['main-background']};
    box-shadow: 0px 10px 15px #22222210 !important;
    a i, a svg, a img {
        ${({ theme }) => (theme.rtl ? 'margin-left' : 'margin-right')}: 8px;
    }
    a svg{
        fill: #888;
    }
    a {
        display: flex;
        align-items: center;
        color: #888;
        padding: 6px 12px;
        .unicon{
            line-height: 0;
			margin-top: -3px;
        }
    }
    a:hover {
        background: ${({ theme }) => theme['primary-color']};
        color: #fff;
        svg{
            fill: #fff;
        }
    }
    .dropdown-theme-2{
        a:hover{
            background: ${({ theme }) => theme.pink}10;
            color: ${({ theme }) => theme.pink}
        }
    }
`;
const DropdownStyle = Styled.div`
    margin-bottom: 10px;
    button{
        margin-right: 10px;
    }
  .ant-card-body .ant-btn {
    ${({ theme }) => (theme.rtl ? 'margin-left' : 'margin-right')}: 10px;
      margin-bottom: 10px;
      height: 36px;
      font-weight: 400;
      border-color: #E3E6EF;
      padding: 0px 19px !important;
      border-radius: 5px;
			svg{
				:focus{
					outline: 0;
				}
			}
  }
`;

const DropdownIconStyleWrapper = Styled.div`
  button{
    padding: 0 !important;
    >span{
      padding: ${({ theme }) => (theme.rtl ? '0 16px 0 10px' : '0 10px 0 16px')}
    }
  }
  .ant-dropdown-trigger{
    height: 100%;
    display: inline-flex;
    align-items: center;
    padding: 0 8px;
    ${({ theme }) => (!theme.rtl ? 'border-left' : 'border-right')}: 1px solid ${({ theme }) =>
  theme['border-color-normal']};
  }
`;

export { Content, DropdownStyle, DropdownIconStyleWrapper };
