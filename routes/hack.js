var sample_hack_data = [
  {
    title: "Click and Meet",
    avatar: "https://mug0.assets-yammer.com/mugshot/images/48x48/B27zKqkcRvqCkZKTz1Ssldm3SNsZXS7S",
    participants: ["Yann Armand", "Vincent Zgueb"],
    description: "Create and manage a virtual conference room you can easily share using an URL without needing to know who's calling and no need for a preliminary contact request.",
    votes: 19
  },
  {
    title: "Big Brother",
    avatar: "https://mug0.assets-yammer.com/mugshot/images/96x96/G7jxPscpwlg67NGnMVjgmvrw7BnMbGQd",
    participants: ["Mikko Törmanen"],
    description: "A modification for Skype client to scan links (URLs) and files sent via Skype chats for malicious content. This would stop Skype to be used as an attack vector in malware outbreaks",
    votes: 18
  },
  {
    title: "HoloSkype",
    avatar: "https://mug0.assets-yammer.com/mugshot/images/96x96/JZlGX3qT7prMZpbJVMqf384WjDB0Xz56",
    participants: ["Ioan-Carol Plangu"],
    description: "A solution for transmitting real 3D video content over video calling. It will use Kinect to record the 3D data, a custom 3D video codec for transmitting the data and a custom 360 degree 3D display.",
    votes: 17
  },
  {
    title: "Hack Tracker",
    avatar: "https://mug0.assets-yammer.com/mugshot/images/96x96/rt8cjlS1KB8vrXJlgBGZNcPSn0ZHccPm",
    participants: ["James Bowman", "Nick Cambpell", "Pedro Morais", "Inna Shvartsman"],
    description: "We are working on a web-based software application that is designed to help keep track of submitted hacks for Garage Hackathon Event efforts. It may be regarded as a type of project tracking system. It has a voting system to collect the votes for projects and presentations.",
    votes: -42
  }  
];


function configureRoutes(app) {
  var Hack = app.Hack,
      formatObject = function (o) {
        var o = o.toObject();
        return {
          'title': o.title,
          'description': o.description,
          'url':  o.url,
          'submission_date': o.submission_date,
          'voters': o.voters,
          'tags': o.tags,
          'snapshots': o.snapshots,
          'status': o.status,
          'owner': o.owner,
          'id': o._id
        };
      };

  // List
  app.get('/hacks.:format', function(req, res) {
    Hack.find(function (err, hacks) {
      if (req.params.format === 'json') {
        res.send({'hacks': sample_hack_data});
        // var hacksList = hacks.map(function(hack) {
        //   return formatObject(hack);
        // });
        // res.send({'hacks': hacksList});
      } else {
        res.send('Format not supported: ' + req.params.format);
      }
    });
  });

  // Create
  app.post('/hacks.:format?', function(req, res) {
    var d = new Hack(req.body.hack);
    d.save(function() {
      if (req.params.format === 'json') {
        res.send({'hack': formatObject(d) });
      } else {
        res.send('Format not available', 400);
      }
    });
  });

  // Read
  app.get('/hacks/:id.:format?', function(req, res) {
   Hack.findOne({ _id: req.params.id }, function(err, d) {
      if (!d) {
        res.send('Object not found', 404);
      } else if (req.params.format === 'json') {
        res.send({'hack': formatObject(d) });
      } else {
        res.send('Format not available', 400);
      }
    });
  });

  // Update
  app.put('/hacks/:id.:format?', function(req, res) {
    Hack.findOne({ _id: req.params.id }, function(err, d) {
      if (!d) {
        res.send('Object not found', 404);
      } else {
        d.title = req.body.hack.title;
        d.save(function(err) {
          res.send({'hack': formatObject(d) });
        });
      }
    });
  });

  // Delete
  app.del('/hacks/:id.:format?', function(req, res) {
    Hack.findOne({ _id: req.params.id }, function(err, d) {
      if (!d) {
        res.send('Object not found', 404);
      } else {
        d.remove(function() {
          res.send('true');
        });
      }
    });
  });

}

exports.configureRoutes = configureRoutes;