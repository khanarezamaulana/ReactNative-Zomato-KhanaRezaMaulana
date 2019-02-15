import React, { Component } from 'react';
import axios from 'axios';
import { Container, Header, Content, Text, Input, Icon, Body, Left, Button, Card, CardItem, Spinner, Thumbnail, Item, Right } from 'native-base';
import { Image } from 'react-native';

class App extends Component {

  constructor(){
    super();
    this.state = {
      apikey: "",
      cari: "",
      resto: ""
    }
  }

  cariResto = () => {
    var url = `https://developers.zomato.com/api/v2.1/search?q=${this.state.cari}`;

    var config = {
      headers:{"user-key": "ced6bfa4740afc97046787b5532d8e5a"}
    };
    
    axios.get(url, config).then((ambilData)=>{
      // console.log(ambilData)
      this.setState({
        resto: ambilData.data.restaurants,
      })
    })
  }

  // mapping hasil cari
  result() {
    return this.state.resto.map((value, i) => {
        return (
          <Card style={{ flex: 0, width: 350, alignSelf: "center", marginTop: 20 }} key={i}>
            <CardItem>
              <Left>
                <Thumbnail style={{ maxWidth: 30, maxHeight: 30 }} square source={{ uri: value.restaurant.strthumb }}></Thumbnail>
                <Body>
                  <Text>{value.restaurant.name}</Text>
                  <Text note>{value.restaurant.location.city}</Text>
                </Body>
              </Left>
              <Right>
                <Text>Rp {(parseInt(value.restaurant.average_cost_for_two) / 2).toLocaleString()}</Text>
              </Right>
            </CardItem>
            <CardItem bordered>
              <Body>
              <Image source={{ uri: value.restaurant.strthumb }} style={{ height: 200, width: "100%", flex: 1 }} />
              </Body>
            </CardItem>
            <CardItem>
              <Left>
                <Icon name="pin" />
                <Text>{value.restaurant.location.address}</Text>
              </Left>
            </CardItem>
          </Card>
        )
    })
  }

  render(){
    return(
      <Container>
        <Header searchBar rounded>
          <Item>
            <Icon name="search" />
              <Input placeholder="Cari menu makanan" onChangeText={(e) => {
                this.setState({
                  cari: e
                })
              }}>
              
              </Input>
          </Item>
        </Header>
        <Button full onPress={this.cariResto}>
          <Text>LIHAT DAFTAR RESTO</Text>
        </Button>

        <Content>
          {this.state.resto ? this.result() : <Text></Text>}
        </Content>
      </Container>
    )
  }
}

export default App; 