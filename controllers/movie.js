const Movie = require('../models/Movie');

const { errorHandler } = require('../auth');

module.exports.addMovie = (req, res) => {
    let newMovie = new Movie({
        title: req.body.title,
        director: req.body.director,
        year: req.body.year,
        description: req.body.description,
        genre: req.body.genre,
        comments: req.body.comments
    });

    Movie.findOne({ title: req.body.title })
    .then(existingMovie => {
        if(existingMovie){
            return res.status(409).send({ message: 'Movie already exists' });
        } else {
            return newMovie.save()
            .then(result => res.status(201).send({
                result: result
            }))
            .catch(error => errorHandler(error,req,res));
        }
    })
    .catch(error => errorHandler(error, req, res));
}


module.exports.getMovies = (req, res) => {
    return Movie.find({})
    .then(result => {
        if(result.length > 0){
            return res.status(200).send({movies: result});
        }
        else{
            return res.status(404).send({ message: 'No movies found'});
        }
    })
    .catch(error => errorHandler(error, req, res));
};


module.exports.getMovie = (req, res) => {
    Movie.findById(req.params.id)
    .then(movie => {
        if(movie){
            return res.status(200).send(movie)
        }else{
            return res.status(404).send({message: 'movie not found'})
        }
    }).catch(error => errorHandler(error, req, res))
};


module.exports.updateMovie = (req, res) => {
    let updatedMovie = {
        title: req.body.title,
        director: req.body.director,
        year: req.body.year,
        description: req.body.description,
        genre: req.body.genre,
        comments: req.body.comments
    }
    return Movie.findByIdAndUpdate(req.params.id, updatedMovie)
    .then(movie => {
        if(movie){
            res.status(200).send({
                message: 'Movie updated successfully',
                updatedMovie: movie});
        } else{
            res.status(404).send({message: 'Movie not found'});
        }
    }).catch(error => errorHandler(error, req, res));
}


module.exports.deleteMovie = (req, res) => {
    Movie.findOneAndDelete({
        _id: req.params.id,
    })
    .then(movie => {
        if(!movie){
            return res.status(404).send({message: 'Movie not found'});
        }else{
            return res.status(200).send({message: 'Movie deleted successfully'})
        }
    }).catch(error => errorHandler(error, req, res));
};


module.exports.addComment = (req, res) => {
    const newComment = {
        userId: req.user.id, 
        comment: req.body.comment
    };

    Movie.findByIdAndUpdate(
        req.params.id,
        { $push: { comments: newComment } },
        { new: true }
    )
    .then(movie => {
        if(movie){
            res.status(200).send({
                message: 'Comment added successfully',
                updatedMovie: movie
            });
        } else{
            res.status(404).send({message: 'Movie not found'});
        }
    })
    .catch(error => errorHandler(error, req, res));
};


module.exports.getComments = (req, res) => {
    Movie.findById(req.params.id)
    .then(movie => {
        if(!movie){
            return res.status(404).send({message: 'movie not found'})
        } else{
            return res.status(200).send({
                comments: movie.comments
            })
        }
    }).catch(error => errorHandler(error, req , res))
};