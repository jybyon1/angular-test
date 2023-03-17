/* SystemJS module definition */
declare let module: NodeModule;
interface NodeModule {
  id: string;
}

/* kakao sdk definition */
declare let kakao: any;

/* dms module definition */
declare let dmsGis: any;
declare let dmsVideoPlayer: any;

/* dream sso definition */
declare let magicline: any;

/* KT module definition */
declare let KTMenu: any;
declare let KTOffcanvas: any;
declare let KTScrolltop: any;
declare let KTHeader: any;
declare let KTToggle: any;
declare let KTUtil: any;
declare let KTDialog: any;
declare let KTWizard: any;
declare let lightSlider: any;

/* jquery module definition */
declare let $: any;
declare let jQuery: any;
interface JQuery {
  selectric(options?: any): any;
}

/* Virtual Select Plugin module definition */
/**
 * Virtual Select Plugin - Properties
 * https://sa-si-dev.github.io/virtual-select/#/properties
 * Virtual Select Plugin - Methods
 * https://sa-si-dev.github.io/virtual-select/#/methods
 */
interface VirtualSelectValueOptions {
  label: string;
  value?: string;
  alias?: string | string[];
  options?: VirtualSelectValueOptions[];
  description?: string[];
  customData?: any;
}
interface VirtualSelectElement extends Element {
  value;
  setValue(value: any);
  reset();
  setOptions(options: VirtualSelectValueOptions[]);
  setDisabledOptions(options: string[]);
  toggleSelectAll(selected: boolean);
  isAllSelected(): boolean;
  addOption(option: VirtualSelectValueOptions);
  getNewValue(): any;
  getDisplayValue(): any;
  getSelectedOptions(): any;
  open();
  close();
  focus();
  enable();
  disable();
  destroy();
  setServerOptions();
  validate();
  toggleRequired();
}
interface VirtualSelectInitOptions {
  /**
   * Properties
   */
  ele?: string | VirtualSelectElement;
  dropboxWrapper?: string;
  options?: VirtualSelectValueOptions[]; // 옵션
  valueKey?: string;
  labelKey?: string;
  descriptionKey?: string;
  aliasKey?: string;
  disabledOptions?: string[]; // 비활성 상태인 옵션
  multiple?: boolean; // 다중선택
  search?: boolean; // 검색
  searchGroup?: boolean; // 검색 시 그룹 이름 포함
  disabled?: boolean; // 비활성
  required?: boolean; // 필수 여부
  autofocus?: boolean; // 자동 포커스
  hideClearButton?: boolean;
  autoSelectFirstOption?: boolean;
  hasOptionDescription?: boolean; // 설명 포함
  disableSelectAll?: boolean; // 전체 선택 비활성
  optionsCount?: number;
  optionHeight?: string; // 옵션 높이
  position?: string; // 드롭박스 위치 (auto, top, bottom, top left, top right, bottom left, bottom right)
  textDirection?: string; // 텍스트 방향 (ltr, rtl)
  selectedValue?: string | string[]; // 선택된 옵션
  silentInitialValueSet?: boolean;
  dropboxWidth?: string; // 드롭박스 너비
  zIndex?: number;
  noOfDisplayValues?: number; // 표출할 값 개수
  allowNewOption?: boolean; // 검색하여 새 옵션 추가 허용
  tooltipFontSize?: string;
  tooltipAlignment?: string;
  tooltipMaxWidth?: string;
  showSelectedOptionsFirst?: boolean; // 선택된 값을 최상단에 표출
  markSearchResults?: boolean; // 검색 일치한 구문 강조
  name?: string;
  keepAlwaysOpen?: boolean;
  maxValues?: number; // 최대 선택 가능개수
  additionalClasses?: string; // wrapper element 의 추가적인 class
  showDropboxAsPopup?: boolean; // 작은 화면에서 드롭박스를 팝업으로 보여줌
  popupDropboxBreakpoint?: string;
  popupPosition?: string; // 팝업 위치 (left, center, or right)
  onServerSearch?: function;
  labelRenderer?: function; // label 렌더러
  ariaLabelledby?: string; // aria-labelledby 속성
  hideValueTooltipOnSelectAll?: boolean; // 모든 옵션이 선택된 경우 값 도구 설명 숨기기
  showOptionsOnlyOnSearch?: boolean; // 검색 값이 비어 있지 않은 경우에만 선택하는 옵션 표시
  selectAllOnlyVisible?: boolean; // 전체 선택 시, 보여지는 옵션만 선택됨
  alwaysShowSelectedOptionsCount?: boolean;
  disableAllOptionsSelectedText?: boolean;
  showValueAsTags?: boolean; // 태그로 표출
  disableOptionGroupCheckbox?: boolean; // 옵션 그룹 체크박스 비활성
  enableSecureText?: boolean;
  setValueAsArray?: boolean;
  emptyValue?: string; // 값이 없을 때 표시할 값
  disableValidation?: boolean; // 필수 유효성 검사 비활성화
  useGroupValue?: boolean; // 그룹 값 사용
  maxWidth?: string; // 선택 요소의 최대 너비
  /**
   * Text Properties
   */
  placeholder?: string;
  noOptionsText?: string;
  noSearchResultsText?: string;
  selectAllText?: string;
  searchPlaceholderText?: string;
  optionsSelectedText?: string;
  optionSelectedText?: string;
  allOptionsSelectedText?: string;
  clearButtonText?: string;
  moreText?: string;
}
interface VirtualSelectConfig {
  init(option: VirtualSelectInitOptions);
}
declare let VirtualSelect: VirtualSelectConfig;
