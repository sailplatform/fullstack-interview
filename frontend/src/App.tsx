import {BrowserRouter, Route, Switch} from 'react-router-dom';
import './App.css';
import AddView from './views/AddView';
import ListView from './views/ListView';
import EditView from "./views/EditView";
import DeleteView from "./views/DeleteView";

function App() {
    return <BrowserRouter>
        <Switch>
            <Route exact path="/" component={ListView}/>
            <Route path="/add" component={AddView}/>
            <Route path="/edit/" component={EditView}/>
            <Route path="/delete/" component={DeleteView}/>
        </Switch>
    </BrowserRouter>;
}

export default App;
