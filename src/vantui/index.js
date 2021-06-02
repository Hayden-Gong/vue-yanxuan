import Vue from 'vue';
// 引入组件
import { 
    Search, 
    Swipe, 
    SwipeItem, 
    Grid, 
    GridItem, 
    Tabbar, 
    TabbarItem, 
    Image,
    Icon,
    Tag,
    List,
    Cell,
    DropdownMenu,
    DropdownItem,
    Empty,
    Toast,
    Popup,
    Form,
    Field,
    Button
} from 'vant';

// 引入样式
// 已安装自动按需引入样式的插件
// import 'vant/lib/search/style';

// 注册
Vue.use(Search);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Image);
Vue.use(Icon);
Vue.use(Tag);
Vue.use(List);
Vue.use(Cell);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Empty);
Vue.use(Toast);
Vue.use(Popup);
Vue.use(Form);
Vue.use(Field);
Vue.use(Button);