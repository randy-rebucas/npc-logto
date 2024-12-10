const Member = require("../models/Member");
const UserService = require("../services/UserService");
const generator = require("generate-password");

exports.getMembers = async (req, res) => {
  // Get pagination parameters from query string, with defaults
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    // Get total count for pagination metadata
    const total = await Member.countDocuments();

    // Get paginated members
    const members = await Member.find().skip(skip).limit(limit);

    res.json({
      members,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getMember = async (req, res) => {
  /**
   * Get the member from the database
   */
  const member = await Member.findById(req.params.id);
  res.json({ member });
};

exports.createMember = async (req, res) => {
  /**
   * Get the member data from the request middleware
   */
  const member = req.member;

  try {
    /**
     * Get the custom fields
     * first-name
     * last-name
     * display-name
     * bio
     * age
     * phone-number
     */
    const customFields = {
      firstName: member.payload.customFields["first-name"],
      lastName: member.payload.customFields["last-name"],
      displayName: member.payload.customFields["display-name"],
    };

    /**
     * Generate a temporary password for the user
     * NOTE: This is a temporary password, we need to send an email to the user with the password
     */
    const passcode = generator.generate({
      length: 10,
      numbers: true,
    });

    /**
     * Create the payload for the user
     */
    const payload = {
      email: member.payload.auth.email,
      password: passcode,
      firstName: customFields.firstName,
      lastName: customFields.lastName,
      displayName: customFields.displayName,
      bio: member.payload.customFields.bio,
      publicData: {
        age: member.payload.customFields.age,
      },
      protectedData: {
        phoneNumber: member.payload.customFields.phoneNumber,
      },
    };

    /**
     * Sync the user to Sharetribe
     */
    const user = await UserService.createUser(payload);

    /**
     * Update the member accountSynced to true
     */
    if (user) {
      member.update({
        $set: {
          accountSynced: true,
        },
      });
    }

    res.status(201).json({ member });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateMember = async (req, res) => {
  const member = req.member;
  console.log(member);

  res.status(201).json({ member });
};

exports.deleteMember = async (req, res) => {
  const member = req.member;
  console.log(member);

  res.status(201).json({ member });
};
