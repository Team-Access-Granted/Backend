import { Schema, model } from 'mongoose';
import { compareSync, hashSync } from 'bcrypt';
import validator from 'validator';

const saltRounds = Number(process.env.SALT_ROUNDS)

const UserSchema = Schema(
	{
		
		name : {
			type : String,
			required : "Name is required."
		},
		
		email : {
			type : String,
			required : "Email is required",
			trim: true,
			unique: [true, 'Email already exists'],
			match: [/.+@.+\..+/, 'Email is invalid']
		},
		
		hashed_password : { 
			type : String,
			required: "Password is required",
		},
		
		active: {
			type : Boolean,
			default : false
		},
		
		image : {
			type: Schema.Types.ObjectId, 
			ref: 'Image'
		},
		
		phoneNumber: {
			type: String,
			trim: true,
			default : "",
			validate: {
				validator: (value) => validator.isMobilePhone(value, 'any'),
				message: "Contact Number is invalid."
			}
		}
	},
	{
		timestamps: true,
		discriminatorKey: 'role'
	}
);

UserSchema.path('hashed_password').validate(function(){
    if(this._password && this._password.length < 8){
        this.invalidate('password', 'Password must be at least 8 characters.')
    }
    if(!this._password && this.isNew){
        this.invalidate('password', 'Password is required.')
    }
}, null)

UserSchema.virtual('password')
.set(function(pass){
    this._password = pass
    this.hashed_password = this.encryptPassword(pass)
})
.get(function(){
    return this._password
})

UserSchema.set('toJSON', {
	versionKey: false,
	transform : function (doc, ret, options) {
		delete ret.hashed_password;
		return ret;
	} 
});

UserSchema.methods = {
    authenticate : function(pass){
        return compareSync(pass, this.hashed_password)
    },
    encryptPassword : function(pass){
        return hashSync(pass, saltRounds)
    },
    isActive : function(){
        return this.active
    },
	isStudent: function(){
		return this.role == 'Student'
	},
	isUniversityAdmin: function(){
		return this.role == 'UniversityAdmin'
	},
	isCompanyAdmin: function(){
		return this.role == 'CompanyAdmin'
	}
}

const User = model('User',UserSchema);

export default User;