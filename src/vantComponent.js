import Vue from 'vue';
import {
  NavBar,
  Button,
  RadioGroup,
  Radio,
  CellGroup,
  Cell,
  Icon,
  Popup,
  Toast,
  Tabbar,
  TabbarItem,
  Checkbox,
  CheckboxGroup,
  Field,
  Picker,
  Tab,
  Tabs,
  Switch,
  SwitchCell,
  DatetimePicker,
  Swipe,
  SwipeItem,
  Overlay,
  Panel,
  List,
  Search,
  Dialog,
  ActionSheet,
  Slider,
  Uploader,
} from 'vant';

window.Toast = Toast;
window.Dialog = Dialog;

Vue.use(NavBar)
  .use(Button)
  .use(RadioGroup)
  .use(Radio)
  .use(CellGroup)
  .use(Cell)
  .use(Icon)
  .use(Popup)
  .use(Toast)
  .use(Tabbar)
  .use(TabbarItem)
  .use(Checkbox)
  .use(CheckboxGroup)
  .use(Field)
  .use(Picker)
  .use(Tab)
  .use(Tabs)
  .use(Switch)
  .use(SwitchCell)
  .use(DatetimePicker)
  .use(Swipe)
  .use(Overlay)
  .use(Slider)
  .use(SwipeItem)
  .use(Dialog);
// Vue.use(Panel);
// Vue.use(List);
// Vue.use(Search);

// Vue.use(ActionSheet);
// Vue.use(Slider);
// Vue.use(Uploader);
