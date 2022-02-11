import React from 'react';
import { StatusBar, StyleSheet, View, TextInput, Button, FlatList, Text, TouchableOpacity } from 'react-native';

const Item = ({ title, summary, rating, select }) => (
  <TouchableOpacity style={styles.item} onPress={select}>
    <Text style={{ fontWeight: 'bold' }}>{title}</Text>
    <Text style={{ color: 'gray' }}>{summary.length > 100 ? summary.slice(0, 120) + '...' : summary}</Text>
    <Text>Note : {rating} / 10</Text>
  </TouchableOpacity>
);

const Movie = ({ title, summary, rating }) => (
  <View>
    <Text style={styles.title}>{title}</Text>
    <Text style={{ color: 'gray' }}>{summary}</Text>
    <Text>{rating} / 10</Text>
  </View>
);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      summary: '',
      rating: '',
      valid: false,
      movies: [{
        id: 0, 
        title: 'Spider-Man: No Way Home', 
        summary: "L'identité de Spider-Man étant désormais révélée, Peter demande de l'aide au docteur Strange. Lorsqu'un sort tourne mal, des ennemis commencent à apparaître, forçant Peter à découvrir ce que signifie vraiment être Spider-Man.", 
        rating: 8.7
      }],
      page: '',
      selected: '',
    }
  }

  checkTitle = (title) => {
    if (title.length >= 0)
      this.setState({title}, this.validateForm);
  }

  checkSummary = (summary) => {
    if (summary.length >= 0)
      this.setState({summary}, this.validateForm);
  }

  checkRating = (rating) => {
    if (rating >= 0 && rating <= 10)
      this.setState({rating}, this.validateForm);
  }

  validateForm = () => {
    if (this.state.title.length > 0 && this.state.summary.length > 0 && this.state.rating.length > 0)
      this.setState({valid: true});
    else
      this.setState({valid: false});
  }

  clearForm = () => {
    this.setState({
      title: '',
      summary: '',
      rating: '',
      valid: '',
    })
  }

  addMovie = () => {
    this.setState(prevState => ({ 
      movies: [...prevState.movies, {
        id: this.state.movies.length, 
        title: this.state.title, 
        summary: this.state.summary, 
        rating: this.state.rating
      }],
      page: 'movie',
      selected: this.state.movies.length,
    }));
    this.clearForm();
  }

  cancel = () => {
    this.clearForm();
    this.setState({ page: '' });
  }

  renderItem = ({ item }) => (
    <Item 
      title={item.title} 
      summary={item.summary} 
      rating={item.rating} 
      select={() => this.setState({ page: 'movie', selected: item.id })}
    />
  );

  render = () => {
    if (this.state.page === 'create') {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Ajouter un film</Text>
          
          <TextInput
            value={this.state.title}
            onChangeText={this.checkTitle}
            placeholder='Titre du film'
            style={styles.input}
          />
          <TextInput
            value={this.state.summary}
            onChangeText={this.checkSummary}
            placeholder='Résumé personnel'
            style={styles.input}
          />
          <TextInput
            value={this.state.rating}
            onChangeText={this.checkRating}
            placeholder='Notes'
            keyboardType='numeric'
            style={styles.input}
          />
          
          <View style={{ flexDirection: 'row' }}>
            <Button title='Valider' disabled={!this.state.valid} onPress={this.addMovie} />
            <Button title='Annuler' onPress={this.cancel} />
          </View>

          <StatusBar style="auto" />
        </View>
      );
    } else if (this.state.page === 'movie') {
      let movie = this.state.movies[this.state.selected];
      return (
        <View style={styles.containerMovie}>
          <Movie 
            title={movie.title} 
            summary={movie.summary} 
            rating={movie.rating}
          />

          <Button 
            title='Retour accueil' 
            onPress={() => this.setState({ page: '', selected: '' })} 
          />

          <StatusBar style="auto" />
        </View>
      )
    } else {
      return (
        <View style={styles.containerList}>
          <Button 
            title='Ajouter un film' 
            onPress={() => this.setState({ page: 'create' })} 
          />

          <FlatList
            data={this.state.movies}
            renderItem={this.renderItem}
            keyExtractor={item => item.id}
          />

          <StatusBar style="auto" />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerList: {
    padding: 20,
    marginBottom: 20,
  },
  containerMovie: {
    padding: 20,
  },
  item: {
    backgroundColor: 'lightgray',
    padding: 20,
    marginVertical: 7,
    borderRadius: 2,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    margin: 12,
  },
  input: {
    width: 300,
    height: 40,
    margin: 6,
    borderWidth: 1,
    borderRadius: 2,
    padding: 10,
  },
});

export default App;