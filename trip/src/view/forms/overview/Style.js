import Styled from "vue3-styled-components";

const FormComponentsWrap = Styled.div`
    .ninjadash_datepicker-list{
        .ant-picker.ant-picker-range{
            width: 100%;
        }
    }
    .ninjadash_editor{
        border-radius: 4px;
        .EditorToolbar__root___3_Aqz{
            padding: 12px 20px 0;
        }
        .DraftEditor-root{
            min-height: 100px;
            .public-DraftEditorPlaceholder-root{
                padding: 12px 20px 0;
            }
        }
        select{
            margin-top: -4px;
        }
        .Dropdown__value___34Py9{
            &:after,
            &:before{
                ${({ theme }) => (theme.rtl ? "right" : "left")}: auto;
                ${({ theme }) => (theme.rtl ? "left" : "right")}: 10px;
            }
        }
    }
    .ninjadash_slider-list{
        margin: -25px 0;
        .ant-slider{
            margin: 25px 0;
        }
    }
`;

export { FormComponentsWrap };
