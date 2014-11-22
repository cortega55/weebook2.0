class BooksController < ApplicationController
  respond_to :json, :html

  def index
    @books = Book.all
  end

  def new
    
    @book = current_user.Book.new
  end

  def create
    @book = Book.new(set_params)
    @book.user_id = current_user.id
    if @book.save
      respond_to do |format|
        format.html { redirect_to jobs_path }
        format.json { render json: @book, status: :created }
      end
    else
      respond_to do |format|
        format.html { redirect_to 'new' }
        format.json { render json: @book.errors, status: :unprocessable_entity }
      end
    end
  end

  def show
    # @book = Job.find(params[:id])
    # respond_with @book
  end

  def edit
    @book = Book.find(params[:id])
  end

  def update
    @book = Book.find(params[:id])
    if @book.update_attributes(set_params)
      respond_to do |format|
        format.html { redirect_to jobs_path }
        format.json { render nothing: true, status: :no_content }
      end
    else
      respond_to do |format|
        format.html { render 'edit' }
        format.json { render json: @book.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @book = Book.find(params[:id])
    @book.destroy
    respond_to do |format|
        format.html { redirect_to :root }
        format.json { render json: {head: :ok} }
      end
  end


  protected

  def set_params
    params.require(:job).permit(:title, :author, :ISBN, :course_code)
  end

end











class JobsController < ApplicationController
  respond_to :json, :html

  def index
    @jobs = Job.all.reverse
    respond_with @jobs
  end

  def new
    @job = Job.new
  end

  def create
    @job = Job.new(set_params)
    @job.user_id = current_user.id
    if @job.save
      respond_to do |format|
        format.html { redirect_to jobs_path }
        format.json { render json: @job, status: :created }
      end
    else
      respond_to do |format|
        format.html { redirect_to 'new' }
        format.json { render json: @job.errors, status: :unprocessable_entity }
      end
    end
  end

  def edit
    @job = Job.find(params[:id])
  end

  def update
    @job = Job.find(params[:id])
    if @job.update_attributes(set_params)
      respond_to do |format|
        format.html { redirect_to jobs_path }
        format.json { render nothing: true, status: :no_content }
      end
    else
      respond_to do |format|
        format.html { render 'edit' }
        format.json { render json: @job.errors, status: :unprocessable_entity }
      end
    end
  end

  def show
    @job = Job.find(params[:id])
    respond_with @job
  end

  def destroy
    @job = Job.find(params[:id])
    @job.destroy
    respond_to do |format|
        format.html { redirect_to :root }
        format.json { render json: {head: :ok} }
      end
  end




end

