class Api::V1::TasksController < ApplicationController
  protect_from_forgery with: :null_session

  def index
    @tasks = Task.all
  end

  def create
    @task = Task.new(task_params)
    if @task.save
      render :show, status: :created
    end
  end

  private

  def task_params
    params.require(:task).permit(:name, :done)
  end
end
