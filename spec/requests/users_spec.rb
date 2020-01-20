require 'rails_helper'

RSpec.describe 'Users API', type: :request do
  let!(:users) { create_list(:user, 10) }
  let(:user_id) { users.first.id }

  def authenticated_header(user)
    post '/auth/login', params: { :email => user.email, :password => user.password}
    token = JSON.parse(response.body)['token']
    { 'Authorization': "#{token}" }
  end

  describe 'Authentication' do
      it 'should return token for user' do
        post '/auth/login', params: { :email => users.first.email, :password => users.first.password}
        expect(response).to have_http_status(:ok)
        token = JSON.parse(response.body)['token']
        expect(token).to_not eq('')
      end

      it 'should return unauthorized for invalid user user' do
        post '/auth/login', params: { :email => users.first.email, :password => 'fake news'}
        expect(response).to have_http_status(:unauthorized)
      end

    end

  describe 'GET /api/v1/users' do
    before { get '/api/v1/users' }

    context 'when the request with NO authentication header' do
      it 'should return unauthorized for retrieve users info before login' do
        expect(response).to have_http_status(:unauthorized)
      end
    end

    it 'returns status code 200' do
      user  = create(:user)
      get '/api/v1/users', headers: authenticated_header(user)
      expect(response).to have_http_status(:success)
    end

    it 'return users' do
      user  = users.first
      get '/api/v1/users', headers: authenticated_header(user)
      expect(JSON.parse(response.body).size).to eq(10)
    end
  end

  describe 'POST /api/v1/users' do
    before do
      post '/api/v1/users', params: { :name => 'John', :email => 'john@example.com', :password => 'ex@mpl&123'}
    end

    it 'return the user' do
      expect(JSON.parse(response.body)['name']).to eq('John')
    end
    it 'returns status code 201' do
      expect(response).to have_http_status(:created)
    end
  end

  describe "delete user route" do
    before(:each) do
      @user_one = create(:user)
      @user_two = create(:user)
    end

    it 'should delete the user' do
      get '/api/v1/users' do
        expect(response.status).to eq(:ok)
        expect(JSON.parse(response.body)).to eq([YAML.load(@user_one.to_json),YAML.load(@user_two.to_json),])
      end

      delete "/api/v1/users/#{@user_one.id}" do
        expect(response.status).to eq(:ok)
        expect(JSON.parse(response.body)).to eq([YAML.load(@user_two.to_json),])
      end
    end
  end
end