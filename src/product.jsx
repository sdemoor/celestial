import React from 'react';
import { Link } from 'react-router-dom';
import Placeholder from './placeholder.jpg';

class Product extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            product: {}
        }
    }

    componentDidMount() {
        var that = this;
        var url = window.location.href.split('/');
        var slug = url.pop() || url.pop();

        fetch(CelestialSettings.woo.url + "products?slug=" + slug + "&consumer_key=" + CelestialSettings.woo.consumer_key + "&consumer_secret=" + CelestialSettings.woo.consumer_secret)
            .then(function (response) {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response.json();
            })
            .then(function (res) {
                that.setState({ product: res[0] })
                console.log(that.state.product);
            });
    }

    renderPosts() {
        return (
            <div className="container post-entry">
                <div className="card">
                    <div className="card-body">
                        <div className="col-sm-4"><img className="product-image" src={this.state.product.images ? this.state.product.images[0].src : Placeholder} alt={this.state.product.images ? this.state.product.images[0].alt : 'Placeholder Image'} /></div>
                        <div className="col-sm-8">
                            <h4 className="card-title">{this.state.product.name}</h4>
                            <p className="card-text"><strike>${this.state.product.regular_price}</strike> <u>${this.state.product.sale_price}</u></p>
                            <p className="card-text"><small className="text-muted">{this.state.product.stock_quantity} in stock</small></p>
                            <p className="card-text">{jQuery(this.state.product.description).text()}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    renderEmpty() {
        return (
            <div id="content">
                <div className="container post-entry">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">404 Page Not Found!</h4>
                            <p className="card-text">The page you requested does not exist.</p>
                            <p className="card-text"><Link to={CelestialSettings.path}>Return to homepage</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        return (
            <div id="content">
                {this.state.product ?
                    this.renderPosts() :
                    this.renderEmpty()
                }
            </div>
        );
    }
}

export default Product;