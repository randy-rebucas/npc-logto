exports.getMembers = async (req, res) => {
    res.json({ message: 'Members' });
}

exports.getMember = async (req, res) => {
    res.json({ message: 'Member' });
}

exports.createMember = async (req, res) => {
    console.log(req.body) // Call your action on the request here
    // {
    //     event: 'member.created',
    //     payload: {
    //       auth: { email: 'rey@memberstack.com' },
    //       customFields: { 'first-name': 'Rey' },
    //       id: 'mem_abc',
    //       planConnections: [],
    //       verified: true
    //     },
    //     timestamp: 1698786880
    //   }
    res.json({ message: 'Member created' });
}

exports.updateMember = async (req, res) => {
    console.log(req.body)
    // {
    //     event: 'member.updated',
    //     payload: {
    //       auth: { email: 'rey@memberstack.com' },
    //       customFields: {},
    //       id: 'mem_abc',
    //       metaData: {}
    //     },
    //     reason: [],
    //     timestamp: 5658
    //   }
    res.json({ message: 'Member updated' });
}

exports.deleteMember = async (req, res) => {
    console.log(req.body)
    // {
    //     event: 'member.deleted',
    //     payload: {
    //       auth: { email: 'jennifer32@example.org' },
    //       id: 'mem_abc',
    //       verified: true
    //     },
    //     timestamp: 8602
    //   }
    res.json({ message: 'Member deleted' });
}

